import { BufferGeometry, Material, Mesh, Object3D, Sprite } from "three";
import { validate } from "uuid";
import { SymbolConfig } from "../common/CommonConfig";
import { ObjectCompiler, ObjectCompilerTarget } from "../object/ObjectCompiler";
import { SolidObjectConfig } from "./SolidObjectConfig";

export interface SolidObject3D extends Object3D {
  material: Mesh["material"];
  geometry: Mesh["geometry"];
}

export type BasicSolidObjectCompiler = SolidObjectCompiler<
  SolidObjectConfig,
  SolidObjectCompilerTarget<SolidObjectConfig>,
  SolidObject3D
>;

export interface SolidObjectCompilerTarget<C extends SolidObjectConfig>
  extends ObjectCompilerTarget<C> {
  [key: string]: C;
}

export abstract class SolidObjectCompiler<
  C extends SolidObjectConfig,
  T extends SolidObjectCompilerTarget<C>,
  O extends SolidObject3D
> extends ObjectCompiler<C, T, O> {
  IS_SOLIDOBJECTCOMPILER = true;

  protected geometryMap: Map<SymbolConfig["vid"], BufferGeometry>;
  protected materialMap: Map<SymbolConfig["vid"], Material>;

  constructor() {
    super();

    this.geometryMap = new Map();
    this.materialMap = new Map();

    this.mergeFilterAttribute({
      geometry: true,
      material: true,
    });
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

  add(vid: string, config: T[string]): this {
    const object = this.map.get(vid)!;
    if (!object) {
      console.error(
        `${this.COMPILER_NAME} compiler can not finish add method.`
      );
      return this;
    }

    if (Array.isArray(object.material)) {
      for (const material of object.material) {
        material.dispose();
      }
    } else {
      object.material.dispose();
    }

    let material: Material | Material[];
    if (typeof config.material === "string") {
      material = this.getMaterial(config.material);
    } else {
      material = config.material.map((vid) => this.getMaterial(vid));
    }

    object.material = material;

    if (!(object as unknown as Sprite).isSprite) {
      object.geometry.dispose();
      object.geometry = this.getGeometry(config.geometry);
    }

    super.add(vid, config);
    return this;
  }

  set(vid: string, path: string[], key: string, value: any): this {
    if (!this.map.has(vid)) {
      console.warn(
        `${this.COMPILER_NAME} compiler can not found this vid mapping object: '${vid}'`
      );
      return this;
    }

    const object = this.map.get(vid)!;

    if (key === "geometry" && !(object as unknown as Sprite).isSprite) {
      object.geometry = this.getGeometry(value);
      return this;
    }

    if (key === "material") {
      object.material = this.getMaterial(value);
      return this;
    }

    super.set(vid, path, key, value);
    return this;
  }

  abstract getReplaceMaterial(): Material;
  abstract getReplaceGeometry(): BufferGeometry;
}
