import {
  Box3,
  BoxBufferGeometry,
  BufferGeometry,
  Euler,
  Float32BufferAttribute,
  Quaternion,
  ShapeGeometry,
  TubeGeometry,
} from "three";
import { validate } from "uuid";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import {
  CustomGeometryConfig,
  GeometryAllType,
  GeometryGroup,
} from "./GeometryInterface";
import { CONFIGTYPE } from "../constants/configType";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CurveGeometry } from "../../extends/geometry/CurveGeometry/CurveGeometry";
import constructMap from "./constructMap";

export interface GeometryCompilerTarget extends CompilerTarget {
  [key: string]: GeometryAllType;
}

export class GeometryCompiler extends Compiler {
  // 变换锚点
  static transfromAnchor = function (
    geometry: BufferGeometry,
    config: GeometryAllType
  ): BufferGeometry {
    // 曲线几何和形状几何不期望先center
    // TODO:不再自动居中几何
    if (
      !(geometry instanceof CurveGeometry) &&
      !(geometry instanceof TubeGeometry) &&
      !(geometry instanceof ShapeGeometry)
    ) {
      geometry.center();
    }

    geometry.computeBoundingBox();

    const box: Box3 = geometry.boundingBox!;
    const position = config.position;
    const rotation = config.rotation;
    const scale = config.scale;

    // 先应用旋转缩放
    const quaternion = new Quaternion().setFromEuler(
      new Euler(rotation.x, rotation.y, rotation.z, "XYZ")
    );

    // 再应用缩放
    geometry.applyQuaternion(quaternion);
    geometry.scale(scale.x, scale.y, scale.z);

    // 计算位置
    if (
      !(geometry instanceof CurveGeometry) &&
      !(geometry instanceof TubeGeometry) &&
      !(geometry instanceof ShapeGeometry)
    ) {
      geometry.center();
    }

    geometry.computeBoundingBox();

    // 根据旋转缩放运算位置
    geometry.translate(
      ((box.max.x - box.min.x) / 2) * position.x,
      ((box.max.y - box.min.y) / 2) * position.y,
      ((box.max.z - box.min.z) / 2) * position.z
    );
    return geometry;
  };

  MODULE: MODULETYPE = MODULETYPE.GEOMETRY;

  private target: GeometryCompilerTarget = {};
  private map = new Map<SymbolConfig["vid"], BufferGeometry>();
  private weakMap = new WeakMap<BufferGeometry, SymbolConfig["vid"]>();
  private constructMap: Map<
    CONFIGTYPE,
    (config: any, compiler: GeometryCompiler) => BufferGeometry
  > = constructMap;
  private resourceMap = new Map<string, unknown>();
  private replaceGeometry: BufferGeometry = new BoxBufferGeometry(5, 5, 5);

  constructor() {
    super();
  }

  linkRescourceMap(map: Map<string, unknown>): this {
    this.resourceMap = map;
    return this;
  }

  private getRescource(url: string): BufferGeometry {
    if (!this.resourceMap.has(url)) {
      console.error(`rescoure can not found url: ${url}`);
      return this.replaceGeometry.clone();
    }

    if (
      this.resourceMap.has(url) &&
      this.resourceMap.get(url) instanceof BufferGeometry
    ) {
      const geometry = this.resourceMap.get(url)! as BufferGeometry;
      return geometry.clone();
    } else {
      console.error(
        `url mapping rescource is not class with BufferGeometry: ${url}`
      );
      return this.replaceGeometry.clone();
    }
  }

  getGeometry(url: string): BufferGeometry {
    if (this.map.has(url)) {
      return this.map.get(url)!;
    }

    return this.getRescource(url);
  }

  generateGeometry(
    attribute: CustomGeometryConfig["attribute"]
  ): BufferGeometry {
    const geometry = new BufferGeometry();
    attribute.position.length &&
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(attribute.position, 3)
      );

    attribute.color.length &&
      geometry.setAttribute(
        "color",
        new Float32BufferAttribute(attribute.color, 3)
      );
    attribute.normal.length &&
      geometry.setAttribute(
        "normal",
        new Float32BufferAttribute(attribute.normal, 3)
      );
    attribute.uv.length &&
      geometry.setAttribute("uv", new Float32BufferAttribute(attribute.uv, 2));

    attribute.uv2.length &&
      geometry.setAttribute(
        "uv2",
        new Float32BufferAttribute(attribute.uv2, 2)
      );

    attribute.index.length && geometry.setIndex(attribute.index);
    return geometry;
  }

  getMap(): Map<SymbolConfig["vid"], BufferGeometry> {
    return this.map;
  }

  useEngine(engine: EngineSupport): this {
    return this;
  }

  setTarget(target: GeometryCompilerTarget): this {
    this.target = target;
    return this;
  }

  add(vid: string, config: GeometryAllType): this {
    if (config.type && this.constructMap.has(config.type as CONFIGTYPE)) {
      const geometry = this.constructMap.get(config.type as CONFIGTYPE)!(
        config,
        this
      );

      geometry.clearGroups();

      for (const group of config.groups) {
        geometry.addGroup(group.start, group.count, group.materialIndex);
      }

      this.map.set(vid, geometry);
      this.weakMap.set(geometry, vid);
    }
    return this;
  }

  addGroup(vid: string, group: GeometryGroup): this {
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler can not found object with vid: ${vid}`);
      return this;
    }

    const geometry = this.map.get(vid)!;
    geometry.addGroup(group.start, group.count, group.materialIndex);
    return this;
  }

  updateGroup(vid: string, index: number) {
    return this.removeGroup(vid, index).addGroup(
      vid,
      this.target[vid].groups[index]
    );
  }

  removeGroup(vid: string, index: number): this {
    if (!this.map.has(vid)) {
      console.warn(`geometry compiler can not found object with vid: ${vid}`);
      return this;
    }

    const geometry = this.map.get(vid)!;
    geometry.groups.splice(index, 1);
    return this;
  }

  // 几何的set是重新生成几何然后clone或者copy
  set(vid: string, path: string[], value: any): this {
    if (!validate(vid)) {
      console.warn(
        `geometry compiler set function vid parameters is illeage: '${vid}'`
      );
      return this;
    }

    if (!this.map.has(vid)) {
      console.warn(
        `geometry compiler set function can not found vid geometry: '${vid}'`
      );
      return this;
    }

    const currentGeometry = this.map.get(vid)!;
    const config = this.target[vid];
    const newGeometry = this.constructMap.get(config.type as CONFIGTYPE)!(
      config,
      this
    );
    currentGeometry.copy(newGeometry);
    // 辅助的更新根据uuid的更新而更新，直接copy无法判断是否更新
    // TODO: 使用dispatch通知更新
    currentGeometry.dispatchEvent({
      type: "update",
    });
    currentGeometry.uuid = newGeometry.uuid;
    newGeometry.dispose();

    return this;
  }

  remove(vid: string): this {
    if (!this.map.has(vid)) {
      console.warn(`Geometry Compiler: can not found vid in compiler: ${vid}`);
      return this;
    }

    const geometry = this.map.get(vid)!;

    geometry.dispose();

    this.map.delete(vid);
    this.weakMap.delete(geometry);
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
    this.map.forEach((geometry, vid) => {
      geometry.dispose();
    });
    return this;
  }

  getObjectSymbol(texture: BufferGeometry): string | null {
    return this.weakMap.get(texture) || null;
  }

  getObjectBySymbol(vid: string): BufferGeometry | null {
    return this.map.get(vid) || null;
  }
}
