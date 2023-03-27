import { EventDispatcher } from "@vis-three/core";
import { SymbolConfig } from "../../module/common";
import { BasicCompiler, Compiler } from "../../module";
import { CompilerMembers } from "../../module/space";

export type CompilerManagerParameters = Record<string, Compiler<any, any>>;

export class CompilerManager extends EventDispatcher {
  compilerMap: Map<string, BasicCompiler> = new Map();

  constructor(parameters?: CompilerManagerParameters) {
    super();

    Object.values(CompilerMembers).forEach((Compiler) => {
      const compiler = new Compiler();
      this.compilerMap.set(compiler.MODULE, compiler);
    });

    if (parameters) {
      Object.keys(parameters).forEach((key) => {
        this.compilerMap.set(parameters[key].MODULE, parameters[key]);
      });
    }
  }

  /**
   * 编译器扩展
   * @param compiler
   */
  extend(compiler, focus: boolean = false) {
    if (this.compilerMap.has(compiler.MODULE)) {
      console.warn("compiler manager has exist this compiler", compiler);

      if (focus) {
        this.compilerMap.set(compiler.MODULE, compiler as BasicCompiler);
      }
    } else {
      this.compilerMap.set(compiler.MODULE, compiler as BasicCompiler);
    }
  }

  getCompiler<D>(module: string) {
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
  getObjectSymbol<O extends object>(object: O): SymbolConfig["vid"] | null {
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

  getObjectfromModule(module: string, vid: string) {
    if (!this.compilerMap.has(module)) {
      console.warn(`compiler manager can not found this module: ${module}`);
      return null;
    }

    const compiler = this.compilerMap.get(module)!;
    return compiler.map.get(vid) || null;
  }

  getObjectfromModules(modules: string[] | Record<string, any>, vid: string) {
    if (!Array.isArray(modules)) {
      modules = Object.keys(modules);
    }

    for (const module of modules as string[]) {
      if (!this.compilerMap.has(module)) {
        console.warn(`compiler manager can not found this module: ${module}`);
        continue;
      }

      const compiler = this.compilerMap.get(module)!;
      return compiler.map.get(vid) || null;
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
