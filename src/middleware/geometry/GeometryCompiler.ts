import {
  Box3,
  BoxBufferGeometry,
  BufferGeometry,
  CircleBufferGeometry,
  ConeBufferGeometry,
  CylinderBufferGeometry,
  EdgesGeometry,
  Euler,
  Float32BufferAttribute,
  Matrix4,
  PlaneBufferGeometry,
  Quaternion,
  RingBufferGeometry,
  SphereBufferGeometry,
  TorusGeometry,
  TubeGeometry,
  Vector3,
} from "three";
import { validate } from "uuid";
import { LoadGeometry } from "../../extends/geometry/LoadGeometry";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { SymbolConfig } from "../common/CommonConfig";
import {
  BoxGeometryConfig,
  CircleGeometryConfig,
  ConeGeometryConfig,
  CubicBezierCurveGeometryConfig,
  CustomGeometryConfig,
  CylinderGeometryConfig,
  EdgesGeometryConfig,
  GeometryAllType,
  GeometryGroup,
  LineCurveGeometryConfig,
  LineTubeGeometryConfig,
  LoadGeometryConfig,
  PlaneGeometryConfig,
  QuadraticBezierCurveGeometryConfig,
  RingGeometryConfig,
  SphereGeometryConfig,
  SplineCurveGeometryConfig,
  SplineTubeGeometryConfig,
  TorusGeometryConfig,
} from "./GeometryConfig";
import { CONFIGTYPE } from "../constants/configType";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
import { LineCurveGeometry } from "../../extends/geometry/LineCurveGeometry";
import { SplineCurveGeometry } from "../../extends/geometry/SplineCurveGeometry";
import { CubicBezierCurveGeometry } from "../../extends/geometry/CubicBezierCurveGeometry";
import { QuadraticBezierCurveGeometry } from "../../extends/geometry/QuadraticBezierCurveGeometry";
import { CurveGeometry } from "../../extends/geometry/CurveGeometry";
import { LineTubeGeometry } from "../../extends/geometry/LineTubeGeometry";
import { SplineTubeGeometry } from "../../extends/geometry/SplineTubeGeometry";

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
    if (
      !(geometry instanceof CurveGeometry) &&
      !(geometry instanceof TubeGeometry)
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
      !(geometry instanceof TubeGeometry)
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
  private constructMap: Map<string, (config: unknown) => BufferGeometry>;
  private resourceMap = new Map<string, unknown>();
  private replaceGeometry: BufferGeometry = new BoxBufferGeometry(5, 5, 5);

  constructor() {
    super();

    const constructMap = new Map();

    constructMap.set(CONFIGTYPE.BOXGEOMETRY, (config: BoxGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(
        new BoxBufferGeometry(
          config.width,
          config.height,
          config.depth,
          config.widthSegments,
          config.heightSegments,
          config.depthSegments
        ),
        config
      );
    });

    constructMap.set(
      CONFIGTYPE.SPHEREGEOMETRY,
      (config: SphereGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new SphereBufferGeometry(
            config.radius,
            config.widthSegments,
            config.heightSegments,
            config.phiStart,
            config.phiLength,
            config.thetaStart,
            config.thetaLength
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.PLANEGEOMETRY,
      (config: PlaneGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new PlaneBufferGeometry(
            config.width,
            config.height,
            config.widthSegments,
            config.heightSegments
          ),
          config
        );
      }
    );

    constructMap.set(CONFIGTYPE.LOADGEOMETRY, (config: LoadGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(
        new LoadGeometry(this.getGeometry(config.url)),
        config
      );
    });

    constructMap.set(
      CONFIGTYPE.CUSTOMGEOMETRY,
      (config: CustomGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          this.generateGeometry(config.attribute),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.CIRCLEGEOMETRY,
      (config: CircleGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new CircleBufferGeometry(
            config.radius,
            config.segments,
            config.thetaStart,
            config.thetaLength
          ),
          config
        );
      }
    );

    constructMap.set(CONFIGTYPE.CONEGEOMETRY, (config: ConeGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(
        new ConeBufferGeometry(
          config.radius,
          config.height,
          config.radialSegments,
          config.heightSegments,
          config.openEnded,
          config.thetaStart,
          config.thetaLength
        ),
        config
      );
    });

    constructMap.set(
      CONFIGTYPE.CYLINDERGEOMETRY,
      (config: CylinderGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new CylinderBufferGeometry(
            config.radiusTop,
            config.radiusBottom,
            config.height,
            config.radialSegments,
            config.heightSegments,
            config.openEnded,
            config.thetaStart,
            config.thetaLength
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.EDGESGEOMETRY,
      (config: EdgesGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new EdgesGeometry(this.map.get(config.url), config.thresholdAngle),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.LINECURVEGEOMETRY,
      (config: LineCurveGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new LineCurveGeometry(
            config.path.map(
              (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
            ),
            config.divisions,
            config.space
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.SPLINECURVEGEOMETRY,
      (config: SplineCurveGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new SplineCurveGeometry(
            config.path.map(
              (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
            ),
            config.divisions,
            config.space
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.CUBICBEZIERCURVEGEOMETRY,
      (config: CubicBezierCurveGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new CubicBezierCurveGeometry(
            config.path.map(
              (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
            ),
            config.divisions,
            config.space
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.QUADRATICBEZIERCURVEGEOMETRY,
      (config: QuadraticBezierCurveGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new QuadraticBezierCurveGeometry(
            config.path.map(
              (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
            ),
            config.divisions,
            config.space
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.LINETUBEGEOMETRY,
      (config: LineTubeGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new LineTubeGeometry(
            config.path.map(
              (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
            ),
            config.tubularSegments,
            config.radius,
            config.radialSegments,
            config.closed
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.SPLINETUBEGEOMETRY,
      (config: SplineTubeGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new SplineTubeGeometry(
            config.path.map(
              (vector3) => new Vector3(vector3.x, vector3.y, vector3.z)
            ),
            config.tubularSegments,
            config.radius,
            config.radialSegments,
            config.closed
          ),
          config
        );
      }
    );

    constructMap.set(
      CONFIGTYPE.TORUSGEOMETRY,
      (config: TorusGeometryConfig) => {
        return GeometryCompiler.transfromAnchor(
          new TorusGeometry(
            config.radius,
            config.tube,
            config.radialSegments,
            config.tubularSegments,
            config.arc
          ),
          config
        );
      }
    );

    constructMap.set(CONFIGTYPE.RINGGEOMETRY, (config: RingGeometryConfig) => {
      return GeometryCompiler.transfromAnchor(
        new RingBufferGeometry(
          config.innerRadius,
          config.outerRadius,
          config.thetaSegments,
          config.phiSegments,
          config.thetaStart,
          config.thetaLength
        ),
        config
      );
    });

    this.constructMap = constructMap;
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

  private getGeometry(url: string): BufferGeometry {
    if (this.map.has(url)) {
      return this.map.get(url)!;
    }

    return this.getRescource(url);
  }

  private generateGeometry(
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
    if (config.type && this.constructMap.has(config.type)) {
      const geometry = this.constructMap.get(config.type)!(config);

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
    const newGeometry = this.constructMap.get(config.type)!(config);
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
