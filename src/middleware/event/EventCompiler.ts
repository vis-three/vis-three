import { Compiler, CompilerTarget } from "../../core/Compiler";
import { EventConfig } from "./eventConfig";
import { SymbolConfig } from "../common/CommonConfig";
import { Object3D } from "three";
import { EVENTNAME, ObjectEvent } from "../../manager/EventManager";
import { isValidEnum } from "../../utils/utils";
import { v4 as getUuid } from "uuid";

import * as BasicEventLbirary from "../../convenient/BasicEventLibrary/handler";
import * as RealTimeAnimateLibrary from "../../convenient/RealTimeAnimateLibrary/handler";
import { EngineSupport } from "../../engine/EngineSupport";

export type EventHandler<C extends BasicEventConfig> = (
  compiler: EventCompiler,
  config: C
) => (event?: ObjectEvent) => void;
export interface BasicEventConfig {
  name: string;
  desp: string;
}

export interface EventCompilerTarget extends CompilerTarget {
  [key: string]: EventConfig;
}

export interface EventCompilerParameters {
  target: EventCompilerTarget;
  engine: EngineSupport;
}

interface EventStructure {
  target: string;
  pointerdown: string[];
  pointermove: string[];
  pointerup: string[];
  pointerenter: string[];
  pointerleave: string[];
  click: string[];
  dblclick: string[];
  contextmenu: string[];
}

export class EventCompiler extends Compiler {
  static eventLibrary: { [key: string]: EventHandler<BasicEventConfig> } = {};

  static registerEvent = function (map: unknown) {
    EventCompiler.eventLibrary = Object.assign(EventCompiler.eventLibrary, map);
  };

  engine!: EngineSupport;

  private target: EventCompilerTarget;
  private map: Map<string, EventStructure>;
  private funMap: Map<string, (event?: ObjectEvent) => void>;
  private objectMapSet: Set<Map<SymbolConfig["vid"], Object3D>>;

  constructor(parameters?: EventCompilerParameters) {
    super();
    if (parameters) {
      this.target = parameters.target;
      this.engine = parameters.engine;
    } else {
      this.target = {};
      // TSC: Uncaught ReferenceError: Cannot access 'Engine' before initialization
      // this.engine = new EngineSupport()
    }

    this.map = new Map();
    this.funMap = new Map();
    this.objectMapSet = new Set();
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

  // 获取目标物体
  private getTargetObject(vid: string): Object3D | null {
    if (!this.map.has(vid)) {
      return null;
    }

    const structure = this.map.get(vid)!;
    return this.getObject(structure.target);
  }

  linkObjectMap(...map: Map<SymbolConfig["vid"], Object3D>[]): this {
    for (const objectMap of map) {
      if (!this.objectMapSet.has(objectMap)) {
        this.objectMapSet.add(objectMap);
      }
    }
    return this;
  }

  add(vid: string, config: EventConfig): this {
    const structure: EventStructure = {
      target: config.target,
      [EVENTNAME.POINTERDOWN]: [],
      [EVENTNAME.POINTERUP]: [],
      [EVENTNAME.POINTERMOVE]: [],
      [EVENTNAME.POINTERENTER]: [],
      [EVENTNAME.POINTERLEAVE]: [],
      [EVENTNAME.CLICK]: [],
      [EVENTNAME.DBLCLICK]: [],
      [EVENTNAME.CONTEXTMENU]: [],
    };
    this.map.set(vid, structure);
    for (const key in config) {
      const value = config[key];
      if (Array.isArray(value) && isValidEnum(EVENTNAME, key) && value.length) {
        for (const configure of value) {
          this.addEvent(vid, key as EVENTNAME, configure);
        }
      }
    }
    return this;
  }

  addEvent(vid: string, eventName: EVENTNAME, config: BasicEventConfig): this {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }
    if (!EventCompiler.eventLibrary[config.name]) {
      console.warn(`EventCompiler: can not support this event: ${config.name}`);
      return this;
    }

    const targetObject = this.getTargetObject(vid) as Object3D<ObjectEvent>;

    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }

    // 生成函数
    const fun = EventCompiler.eventLibrary[config.name](this, config);
    const funSymbol = getUuid();

    // 映射缓存
    this.funMap.set(funSymbol, fun);

    const structure = this.map.get(vid)!;
    structure[eventName].push(funSymbol);

    // 绑定事件
    targetObject.addEventListener(eventName, fun);
    return this;
  }

  removeEvent(vid: string, eventName: EVENTNAME, index: number): this {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }

    const targetObject = this.getTargetObject(vid) as Object3D<ObjectEvent>;

    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }

    const structure = this.map.get(vid)!;
    const funSymbol = structure[eventName][index];
    const fun = this.funMap.get(funSymbol);

    if (!fun) {
      console.warn(
        `EventCompiler: No matching fun found: ${vid}, ${eventName}, ${index}`
      );
      return this;
    }

    targetObject.removeEventListener(eventName, fun!);
    this.funMap.delete(funSymbol);
    structure[eventName].splice(index, 1);

    return this;
  }

  updateEvent(vid: string, eventName: EVENTNAME, index: number) {
    this.removeEvent(vid, eventName, index);

    // 找到最新配置
    const config = this.target[vid][eventName][index];

    this.addEvent(vid, eventName, config);
  }

  remove(vid: string): this {
    if (!this.map.has(vid)) {
      console.warn(`EventCompiler: No matching vid found: ${vid}`);
      return this;
    }

    const targetObject = this.getTargetObject(vid) as Object3D<ObjectEvent>;

    if (!targetObject) {
      console.warn(`EventCompiler: no object with matching vid found: ${vid}`);
      return this;
    }

    const structure = this.map.get(vid)!;

    for (const key in structure) {
      const funSymbolList = structure[key];
      if (
        Array.isArray(funSymbolList) &&
        isValidEnum(EVENTNAME, key) &&
        funSymbolList.length
      ) {
        for (const funSymbol of funSymbolList) {
          this.removeEvent(vid, key as EVENTNAME, funSymbol);
        }
      }
    }
    this.map.delete(vid);
    return this;
  }

  setTarget(target: EventCompilerTarget): this {
    this.target = target;
    return this;
  }

  compileAll(): this {
    const target = this.target;
    for (const key in target) {
      this.add(key, target[key]);
    }
    return this;
  }

  dispose(): this {
    this.map.clear();
    this.funMap.clear();
    this.objectMapSet.clear();
    return this;
  }
}

EventCompiler.registerEvent(BasicEventLbirary);
EventCompiler.registerEvent(RealTimeAnimateLibrary);
