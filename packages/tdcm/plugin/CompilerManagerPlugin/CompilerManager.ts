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
   * 编译器拓展
   * @param compiler 拓展的编译器
   * @param focus 强制覆盖
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

  /**
   * 获取编译器
   * @param module 编译器所属的模块
   * @returns compiler | null
   */
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

  /**
   * 通过vid标识获取相应的配置化模型
   * @param vid vid标识
   * @returns model
   */
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

  /**
   * 从一个模块中通过vid获取物体对象
   * @param module 指定模块
   * @param vid vid标识
   * @returns object | null
   */
  getObjectFromModule(module: string, vid: string) {
    if (!this.compilerMap.has(module)) {
      console.warn(`compiler manager can not found this module: ${module}`);
      return null;
    }

    const compiler = this.compilerMap.get(module)!;
    return compiler.map.get(vid)?.puppet || null;
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

  /**
   * 从多个模块中通过vid获取物体
   * @param modules 指定的多个模块
   * @param vid vid标识
   * @returns object | null
   */
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
        return compiler.map.get(vid)?.puppet! as unknown as O;
      }
    }

    return null;
  }
  /**
   * 整个编译器的销毁方法
   * @returns this
   */
  dispose(): this {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
    }
    this.compilerMap.clear();
    return this;
  }
}
