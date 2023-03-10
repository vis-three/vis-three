import { EventDispatcher } from "@vis-three/core";
import { BufferGeometry, Material, Object3D, Texture } from "three";
import { SymbolConfig } from "../../module/common";
import { BasicCompiler, Compiler } from "../../module";
import { CompilerMembers, MODULETYPE } from "../../module/space";
import { ObjectCompiler } from "../../object/ObjectCompiler";

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
  getObjectSymbol<O extends Object3D>(object: O): SymbolConfig["vid"] | null {
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
   * 通过vid获取object3D对象
   * @param vid 物体vid标识
   * @returns Object3D | null
   */
  getObject3D<O extends Object3D>(vid: string): O | null {
    for (const compiler of this.compilerMap.values()) {
      if (compiler instanceof ObjectCompiler) {
        if (compiler.map.has(vid)) {
          return compiler.map.get(vid)! as O;
        }
      }
    }
    return null;
  }

  getMaterial(vid: string) {
    const materialCompiler = this.compilerMap.get(MODULETYPE.MATERIAL)!;
    return materialCompiler.map.get(vid) as Material | null;
  }

  getTexture(vid: string) {
    const textureCompiler = this.compilerMap.get(MODULETYPE.TEXTURE)!;
    return textureCompiler.map.get(vid) as Texture | null;
  }

  getGeometry(vid: string) {
    const geometryCompiler = this.compilerMap.get(MODULETYPE.GEOMETRY)!;
    return geometryCompiler.map.get(vid) as BufferGeometry | null;
  }

  dispose(): this {
    for (const compiler of this.compilerMap.values()) {
      compiler.dispose();
    }
    this.compilerMap.clear();
    return this;
  }
}
