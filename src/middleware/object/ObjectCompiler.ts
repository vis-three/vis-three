import { Object3D, Scene, Vector3 } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { EVENTNAME, ObjectEvent } from "../../manager/EventManager";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectConfig } from "./ObjectConfig";
import * as BasicEventLbirary from "../../convenient/BasicEventLibrary/handler";
import * as RealTimeAnimateLibrary from "../../convenient/RealTimeAnimateLibrary/handler";

export type BasicObjectCompiler = ObjectCompiler<
  ObjectConfig,
  ObjectCompilerTarget<ObjectConfig>,
  Object3D
>;
export interface ObjectCompilerTarget<C extends ObjectConfig>
  extends CompilerTarget {
  [key: string]: C;
}

export interface ObjectCompilerParameters<
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>
> {
  scene?: Scene;
  target?: T;
}

export interface CacheObjectData {
  lookAtTarget: Vector3 | null;
  updateMatrixWorldFun: ((focus: boolean) => void) | null;
}

export interface BasicEventConfig {
  name: string;
  desp: string;
}

export interface FilterAttribute {
  [key: string]: FilterAttribute | boolean;
}

export type EventHandler<C extends BasicEventConfig> = (
  compiler: BasicObjectCompiler,
  config: C
) => (event?: ObjectEvent) => void;

export abstract class ObjectCompiler<
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
> extends Compiler {
  static eventLibrary: { [key: string]: EventHandler<BasicEventConfig> } = {};
  static eventSymbol = "vis.event";
  static registerEvent = function (map: unknown) {
    ObjectCompiler.eventLibrary = Object.assign(
      ObjectCompiler.eventLibrary,
      map
    );
  };

  IS_OBJECTCOMPILER = true;

  abstract COMPILER_NAME: string;

  protected scene!: Scene;
  protected target!: T;
  protected map: Map<SymbolConfig["vid"], O>;
  protected weakMap: WeakMap<O, SymbolConfig["vid"]>;

  protected objectCacheMap: WeakMap<O, CacheObjectData>;

  protected objectMapSet: Set<Map<SymbolConfig["vid"], Object3D>>;

  // merge 属性的时候会直接被过滤的属性
  private filterAttribute: FilterAttribute = {
    lookAt: true,
    children: true,
    pointerdown: true,
    pointermove: true,
    pointerup: true,
    pointerenter: true,
    pointerleave: true,
    click: true,
    dblclick: true,
    contextmenu: true,
  };

  engine!: EngineSupport;

  constructor(parameters?: ObjectCompilerParameters<C, T>) {
    super();
    if (parameters) {
      parameters.scene && (this.scene = parameters.scene);
      parameters.target && (this.target = parameters.target);
    } else {
      this.scene = new Scene();
      this.target = {} as T;
    }

    this.map = new Map();
    this.weakMap = new WeakMap();
    this.objectMapSet = new Set();
    this.objectCacheMap = new WeakMap();
  }

  // 获取物体
  getObject(vid: string): Object3D | null {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid)!;
      }
    }
    return null;
  }

  protected mergeFilterAttribute(object: FilterAttribute): this {
    const recursion = (config: FilterAttribute, merge: FilterAttribute) => {
      for (const key in merge) {
        if (config[key] === undefined) {
          config[key] = merge[key];
          continue;
        }
        if (typeof merge[key] === "object") {
          recursion(
            config[key] as FilterAttribute,
            merge[key] as FilterAttribute
          );
        } else {
          config[key] = merge[key];
        }
      }
    };
    recursion(this.filterAttribute, object);
    return this;
  }

  // 设置物体的lookAt方法
  protected setLookAt(vid: string, target: string): this {
    // 不能自己看自己
    if (vid === target) {
      console.error(`can not set object lookAt itself.`);
      return this;
    }

    if (!this.map.has(vid)) {
      console.error(
        `${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`
      );
      return this;
    }

    const model = this.map.get(vid)!;
    let cacheData = this.objectCacheMap.get(model);

    if (!cacheData) {
      cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
      this.objectCacheMap.set(model, cacheData);
    }

    if (!target) {
      if (!cacheData.updateMatrixWorldFun) {
        return this;
      }

      model.updateMatrixWorld = cacheData.updateMatrixWorldFun;
      cacheData.lookAtTarget = null;
      cacheData.updateMatrixWorldFun = null;
      return this;
    }

    const lookAtTarget = this.getObject(target);

    if (!lookAtTarget) {
      console.warn(
        `${this.COMPILER_NAME}Compiler: can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    const updateMatrixWorldFun = model.updateMatrixWorld;

    cacheData.updateMatrixWorldFun = updateMatrixWorldFun;
    cacheData.lookAtTarget = lookAtTarget.position;

    model.updateMatrixWorld = (focus: boolean) => {
      updateMatrixWorldFun.bind(model)(focus);
      model.lookAt(cacheData!.lookAtTarget!);
    };

    return this;
  }

  // 添加物体事件
  protected addEvent(
    vid: string,
    eventName: EVENTNAME,
    config: BasicEventConfig
  ): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.COMPILER_NAME} compiler : No matching vid found: ${vid}`
      );
      return this;
    }
    if (!ObjectCompiler.eventLibrary[config.name]) {
      console.warn(
        `${this.COMPILER_NAME} compiler: can not support this event: ${config.name}`
      );
      return this;
    }

    const object = this.map.get(vid)! as unknown as Object3D<ObjectEvent>;

    // 生成函数
    const fun = ObjectCompiler.eventLibrary[config.name](this, config);

    // 映射缓存
    const symbol = Symbol.for(ObjectCompiler.eventSymbol);
    config[symbol] = fun;

    // 绑定事件
    object.addEventListener(eventName, fun);
    return this;
  }

  // 移除事件
  protected removeEvent(
    vid: string,
    eventName: EVENTNAME,
    index: number
  ): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.COMPILER_NAME} compiler: No matching vid found: ${vid}`
      );
      return this;
    }

    const object = this.map.get(vid)! as unknown as Object3D<ObjectEvent>;

    const config = this.target[vid][eventName][index];

    const fun = config[Symbol.for(ObjectCompiler.eventSymbol)];

    if (!fun) {
      console.warn(
        `${this.COMPILER_NAME} compiler: can not fun found event: ${vid}, ${eventName}, ${index}`
      );
      return this;
    }

    object.removeEventListener(eventName, fun!);
    delete config[Symbol.for(ObjectCompiler.eventSymbol)];

    return this;
  }

  // 更新事件
  protected updateEvent(
    vid: string,
    eventName: EVENTNAME,
    index: number
  ): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.COMPILER_NAME} compiler: No matching vid found: ${vid}`
      );
      return this;
    }

    const object = this.map.get(vid)! as unknown as Object3D<ObjectEvent>;
    const symbol = Symbol.for(ObjectCompiler.eventSymbol);

    const config = this.target[vid][eventName][index];

    const fun = config[symbol];

    if (!fun) {
      console.warn(
        `${this.COMPILER_NAME} compiler: can not fun found event: ${vid}, ${eventName}, ${index}`
      );
      return this;
    }

    object.removeEventListener(eventName, fun!);

    // 生成函数
    const newFun = ObjectCompiler.eventLibrary[config.name](this, config);

    // 映射缓存
    config[symbol] = fun;

    // 绑定事件
    object.addEventListener(eventName, newFun);
    return this;
  }

  linkObjectMap(...map: Map<SymbolConfig["vid"], Object3D>[]): this {
    for (const objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }

  useEngine(engine: EngineSupport): this {
    if (!engine.scene) {
      console.warn(`engine muset install scene plugin.`);
      return this;
    }

    this.scene = engine.scene;
    this.engine = engine;
    return this;
  }

  setTarget(target: T): this {
    this.target = target;
    return this;
  }

  getMap(): Map<SymbolConfig["type"], Object3D> {
    return this.map;
  }

  getObjectSymbol(object: O): SymbolConfig["vid"] | null {
    if (this.weakMap.has(object)) {
      return this.weakMap.get(object)!;
    } else {
      return null;
    }
  }

  compileAll(): this {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }

  remove(vid: string): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.COMPILER_NAME}Compiler: can not found object which vid: ${vid}.`
      );
      return this;
    }

    const object = this.map.get(vid)!;

    this.scene.remove(object);
    this.weakMap.delete(object);
    this.objectCacheMap.delete(this.map.get(vid)!);
    this.map.delete(vid);
    return this;
  }

  dispose(): this {
    this.map.clear();
    this.objectMapSet.clear();
    return this;
  }

  add(vid: string, config: T[string]): this {
    const object = this.map.get(vid);

    if (!object) {
      console.error(
        `${this.COMPILER_NAME} compiler can not finish add method.`
      );
    }

    // lookAt
    this.setLookAt(vid, config.lookAt);

    // children

    // event
    for (const eventName of Object.values(EVENTNAME)) {
      const eventList = config[eventName];
      if (eventList.length) {
        for (const event of eventList) {
          this.addEvent(vid, eventName, event);
        }
      }
    }

    Compiler.applyConfig(config, object, this.filterAttribute);
    this.scene.add(object!);

    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.COMPILER_NAME} compiler can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    const attribute = path.length ? path[0]! : key;

    // lookAt
    if (attribute === "lookAt") {
      return this.setLookAt(vid, value);
    }

    // children
    if (attribute === "children") {
    }

    // event
    if (attribute.toLocaleUpperCase() in EVENTNAME) {
      return this.updateEvent(vid, key as EVENTNAME, Number(path[1]));
    }

    // merge
    let object = this.map.get(vid)!;
    let filter = this.filterAttribute;

    for (const key of path) {
      if (filter[key]) {
        if (filter[key] === true) {
          return this;
        } else {
          filter = filter[key] as FilterAttribute;
        }
      }
      object = object[key];
    }

    object[key] = value;

    return this;
  }
}

ObjectCompiler.registerEvent(BasicEventLbirary);
ObjectCompiler.registerEvent(RealTimeAnimateLibrary);
