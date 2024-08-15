import { EventDispatcher } from "@vis-three/core";
import { BasicConfig } from "../../module/common";
import { Compiler, Model } from "../../module";
import { EngineSupport } from "../../engine";

export class CompilerManager extends EventDispatcher {
  compilerMap: Map<string, Compiler<any>> = new Map();

  constructor() {
    super();
  }

  /**
   * 编译器扩展
   * @param compiler
   */
  extend<C extends Compiler<any>>(compiler: C, focus: boolean = false) {
    if (this.compilerMap.has(compiler.MODULE)) {
      console.warn("compiler manager has exist this compiler", compiler);

      if (focus) {
        this.compilerMap.set(compiler.MODULE, compiler);
      }
    } else {
      this.compilerMap.set(compiler.MODULE, compiler);
    }
  }

  getCompiler<D extends Compiler<any> = Compiler<EngineSupport>>(
    module: string
  ) {
    if (this.compilerMap.has(module)) {
      return this.compilerMap.get(module)! as unknown as D;
    } else {
      console.warn(`can not found this type in compiler manager: ${module}`);
      return null;
    }
  }

  /**
   * 获取该three物体的vid标识
   * @param object three object
   * @returns vid or null
   */
  getObjectSymbol(object: object): BasicConfig["vid"] | null {
    for (const compiler of this.compilerMap.values()) {
      const vid = compiler.getObjectSymbol(object);
      if (vid) {
        return vid;
      }
    }

    return null;
  }

  /**
   * 通过vid标识获取相应的three对象
   * @param vid vid标识
   * @returns three object || null
   */
  getObjectBySymbol(vid: string): any | null {
    for (const compiler of this.compilerMap.values()) {
      const object = compiler.getObjectBySymbol(vid);
      if (object) {
        return object;
      }
    }
    return null;
  }

  // TODO: getModelBySymbol
  getModelBySymbol<M extends Model<any, any, any> = Model<any, any, any>>(
    vid: string
  ): M | null {
    for (const compiler of this.compilerMap.values()) {
      const model = compiler.getModelBySymbol(vid);
      if (model) {
        return model as M;
      }
    }
    return null;
  }

  /**
   * @deprecated use getObjectFromModule
   * @param module
   * @param vid
   * @returns
   */
  getObjectfromModule(module: string, vid: string) {
    return this.getObjectFromModule(module, vid);
  }

  getObjectFromModule(module: string, vid: string) {
    if (!this.compilerMap.has(module)) {
      console.warn(`compiler manager can not found this module: ${module}`);
      return null;
    }

    const compiler = this.compilerMap.get(module)!;
    return compiler.map.get(vid) || null;
  }

  /**
   * @deprecated use getObjectFromModules
   * @param modules
   * @param vid
   * @returns
   */
  getObjectfromModules<O extends object = object>(
    modules: string[] | Record<string, any>,
    vid: string
  ) {
    return this.getObjectFromModules<O>(modules, vid);
  }

  getObjectFromModules<O extends object = object>(
    modules: string[] | Record<string, any>,
    vid: string
  ) {
    if (!Array.isArray(modules)) {
      modules = Object.keys(modules);
    }

    for (const module of modules as string[]) {
      if (!this.compilerMap.has(module)) {
        console.warn(`compiler manager can not found this module: ${module}`);
        continue;
      }

      const compiler = this.compilerMap.get(module)!;

      if (compiler.map.has(vid)) {
        return compiler.map.get(vid)! as unknown as O;
      }
    }

    return null;
  }

  dispose(): this {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
    }
    this.compilerMap.clear();
    return this;
  }
}
