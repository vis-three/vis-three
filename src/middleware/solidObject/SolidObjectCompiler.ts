import { BufferGeometry, Material, Object3D } from "three";
import { validate } from "uuid";
import { SymbolConfig } from "../common/CommonConfig";
import {
  ObjectCompiler,
  ObjectCompilerParameters,
  ObjectCompilerTarget,
} from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export type BasicSolidObjectCompiler = SolidObjectCompiler<
  SolidObjectConfig,
  SolidObjectCompilerTarget<SolidObjectConfig>,
  Object3D
>;

export interface SolidObjectCompilerTarget<C extends SolidObjectConfig>
  extends ObjectCompilerTarget<C> {
  [key: string]: C;
}

export interface SolidObjectCompilerParameters<
  C extends SolidObjectConfig,
  T extends SolidObjectCompilerTarget<C>
> extends ObjectCompilerParameters<C, T> {
  target?: T;
}

export abstract class SolidObjectCompiler<
  C extends SolidObjectConfig,
  T extends SolidObjectCompilerTarget<C>,
  O extends Object3D
> extends ObjectCompiler<C, T, O> {
  IS_SOLIDOBJECTCOMPILER = true;

  protected geometryMap: Map<SymbolConfig["vid"], BufferGeometry>;
  protected materialMap: Map<SymbolConfig["vid"], Material>;

  constructor(parameters?: SolidObjectCompilerParameters<C, T>) {
    super(parameters);

    this.geometryMap = new Map();
    this.materialMap = new Map();
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

  linkGeometryMap(map: Map<SymbolConfig["vid"], BufferGeometry>): this {
    this.geometryMap = map;
    return this;
  }

  linkMaterialMap(materialMap: Map<string, Material>): this {
    this.materialMap = materialMap;
    return this;
  }

  abstract getReplaceMaterial(): Material;
  abstract getReplaceGeometry(): BufferGeometry;
}
