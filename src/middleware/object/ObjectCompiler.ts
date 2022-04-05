import { BufferGeometry, Material, Object3D, Scene, Vector3 } from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectConfig } from "./ObjectConfig";

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

export abstract class ObjectCompiler<
  C extends ObjectConfig,
  T extends ObjectCompilerTarget<C>,
  O extends Object3D
> extends Compiler {
  IS_OBJECTCOMPILER = true;

  abstract COMPILER_NAME: string;

  protected scene!: Scene;
  protected target!: T;
  protected map: Map<SymbolConfig["vid"], O>;
  protected weakMap: WeakMap<O, SymbolConfig["vid"]>;

  protected cacheObjectMap: WeakMap<O, CacheObjectData>;

  protected geometryMap: Map<SymbolConfig["vid"], BufferGeometry>;
  protected materialMap: Map<SymbolConfig["vid"], Material>;
  protected objectMapSet: Set<Map<SymbolConfig["vid"], Object3D>>;

  constructor(parameters?: ObjectCompilerParameters<C, T>) {
    super();
    if (parameters) {
      parameters.scene && (this.scene = parameters.scene);
      parameters.target && (this.target = parameters.target);
    } else {
      this.scene = new Scene();
      this.target = {} as T;
    }

    this.geometryMap = new Map();
    this.materialMap = new Map();
    this.map = new Map();
    this.weakMap = new WeakMap();
    this.objectMapSet = new Set();
    this.cacheObjectMap = new WeakMap();
  }

  // 获取材质
  protected getMaterial(vid: string): Material {
    if (validate(vid)) {
      if (this.materialMap.has(vid)) {
        return this.materialMap.get(vid)!;
      } else {
        console.warn(
          `${this.COMPILER_NAME}Compiler: can not found material which vid: ${vid}`
        );
        return this.getReplaceMaterial();
      }
    } else {
      console.warn(
        `${this.COMPILER_NAME}Compiler: material vid parameter is illegal: ${vid}`
      );
      return this.getReplaceMaterial();
    }
  }

  // 获取几何
  protected getGeometry(vid: string): BufferGeometry {
    if (validate(vid)) {
      if (this.geometryMap.has(vid)) {
        return this.geometryMap.get(vid)!;
      } else {
        console.warn(
          `${this.COMPILER_NAME}Compiler: can not found geometry which vid: ${vid}`
        );
        return this.getReplaceGeometry();
      }
    } else {
      console.warn(
        `${this.COMPILER_NAME}Compiler: geometry vid parameter is illegal: ${vid}`
      );
      return this.getReplaceGeometry();
    }
  }

  // 获取物体
  protected getObject(vid: string): Object3D | null {
    for (const map of this.objectMapSet) {
      if (map.has(vid)) {
        return map.get(vid)!;
      }
    }
    return null;
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
    let cacheData = this.cacheObjectMap.get(model);

    if (!cacheData) {
      cacheData = { lookAtTarget: null, updateMatrixWorldFun: null };
      this.cacheObjectMap.set(model, cacheData);
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

  linkGeometryMap(map: Map<SymbolConfig["vid"], BufferGeometry>): this {
    this.geometryMap = map;
    return this;
  }

  linkMaterialMap(materialMap: Map<string, Material>): this {
    this.materialMap = materialMap;
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

  setScene(scene: Scene): this {
    this.scene = scene;
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
    this.cacheObjectMap.delete(this.map.get(vid)!);
    this.map.delete(vid);
    return this;
  }

  dispose(): this {
    this.map.clear();
    this.objectMapSet.clear();
    return this;
  }

  abstract getReplaceMaterial(): Material;
  abstract getReplaceGeometry(): BufferGeometry;
  abstract add(vid: string, config: T[string]): this;
  abstract set(vid: string, path: string[], key: string, value: any): this;
}
