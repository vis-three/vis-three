import { SymbolConfig, Vector3Config } from "@vis-three/middleware";
import { Vector2, Vector3 } from "three";

/**
 * 几何组配置
 */
export interface GeometryGroup {
  /**开始几何点 */
  start: number;
  /**结束几何点 */
  count: number;
  /**材质索引 */
  materialIndex: number;
}

/**
 * 几何配置基础
 */
export interface GeometryConfig extends SymbolConfig {
  /**是否居中几何，开启后会先居中几何，再进行其他几何运算，这对于几何中心不再原点的模型很有用。 */
  center: boolean;
  /**几何锚点中心位置 */
  position: Vector3Config;
  /**几何锚点旋转 */
  rotation: Vector3Config;
  /**几何锚点缩放 */
  scale: Vector3Config;
  /**几何组 */
  groups: GeometryGroup[];
}

/**
 * 立方体几何
 */
export interface BoxGeometryConfig extends GeometryConfig {
  /**立方体宽 */
  width: number;
  /**立方体高 */
  height: number;
  /** 立方体深度 */
  depth: number;
  /** 宽分段数 */
  widthSegments: number;
  /** 高分段数 */
  heightSegments: number;
  /** 深分段数 */
  depthSegments: number;
}

/**
 * 球型几何
 */
export interface SphereGeometryConfig extends GeometryConfig {
  radius: number;
  widthSegments: number;
  heightSegments: number;
  phiStart: number;
  phiLength: number;
  thetaStart: number;
  thetaLength: number;
}

export interface PlaneGeometryConfig extends GeometryConfig {
  width: number;
  height: number;
  widthSegments: number;
  heightSegments: number;
}

export interface CircleGeometryConfig extends GeometryConfig {
  radius: number;
  segments: number;
  thetaStart: number;
  thetaLength: number;
}

export interface ConeGeometryConfig extends GeometryConfig {
  radius: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
}

/**
 * 加载几何
 */
export interface LoadGeometryConfig extends GeometryConfig {
  /**目标几何资源地址，通过ResourceManagerPlugin解析 */
  url: string;
}

export interface CylinderGeometryConfig extends GeometryConfig {
  radiusTop: number;
  radiusBottom: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
  openEnded: boolean;
  thetaStart: number;
  thetaLength: number;
}

export interface DodecahedronGeometryConfig extends GeometryConfig {
  radius: number;
  detail: number;
}

export interface EdgesGeometryConfig extends GeometryConfig {
  /**目标几何vid标识 */
  url: string;
  thresholdAngle: number;
}

export interface TorusGeometryConfig extends GeometryConfig {
  radius: number;
  tube: number;
  radialSegments: number;
  tubularSegments: number;
  arc: number;
}

export interface RingGeometryConfig extends GeometryConfig {
  innerRadius: number;
  outerRadius: number;
  thetaSegments: number;
  phiSegments: number;
  thetaStart: number;
  thetaLength: number;
}

export interface CustomGeometryConfig extends GeometryConfig {
  attribute: {
    position: number[];
    color: number[];
    index: number[];
    normal: number[];
    uv: number[];
    uv2: number[];
  };
}

/**
 * 曲线几何
 */
export interface CurveGeometryConfig extends GeometryConfig {
  /**曲线参数点集 */
  path: Vector3Config[];
  /**曲线分段数 */
  divisions: number;
  /**是否等距分段 */
  space: boolean;
}

export interface LineCurveGeometryConfig extends CurveGeometryConfig {}

export interface SplineCurveGeometryConfig extends CurveGeometryConfig {}

export interface CubicBezierCurveGeometryConfig extends CurveGeometryConfig {}

export interface QuadraticBezierCurveGeometryConfig
  extends CurveGeometryConfig {}

export interface TubeGeometryConfig extends GeometryConfig {
  path: Vector3Config[];
  tubularSegments: number;
  radius: number;
  radialSegments: number;
  closed: boolean;
}

export interface LineTubeGeometryConfig extends TubeGeometryConfig {}

export interface SplineTubeGeometryConfig extends TubeGeometryConfig {}

/**
 * 形状几何
 */
export interface ShapeGeometryConfig extends GeometryConfig {
  /**形状vid标识 */
  shape: string;
  curveSegments: number;
}

export interface LineShapeGeometryConfig extends GeometryConfig {
  path: Vector2[];
  curveSegments: number;
}

export interface ExtrudeGeometryConfig extends GeometryConfig {
  /**挤压形状vid标识 */
  shapes: string;
  options: {
    curveSegments: number;
    steps: number;
    depth: number;
    bevelEnabled: boolean;
    bevelThickness: number;
    bevelSize: number;
    bevelOffset: number;
    bevelSegments: number;
    extrudePath: string;
  };
}

export interface PathGeometryConfig extends GeometryConfig {
  /**路径vid标识 */
  path: string;
  space: boolean;
  divisions: number;
}

export type GeometryAllType =
  | BoxGeometryConfig
  | SphereGeometryConfig
  | PlaneGeometryConfig
  | LoadGeometryConfig
  | CircleGeometryConfig
  | ConeGeometryConfig
  | CylinderGeometryConfig
  | DodecahedronGeometryConfig
  | EdgesGeometryConfig
  | LineCurveGeometryConfig
  | SplineCurveGeometryConfig
  | CubicBezierCurveGeometryConfig
  | QuadraticBezierCurveGeometryConfig
  | CustomGeometryConfig
  | LineTubeGeometryConfig
  | SplineTubeGeometryConfig
  | TorusGeometryConfig
  | RingGeometryConfig
  | LineShapeGeometryConfig
  | ExtrudeGeometryConfig
  | PathGeometryConfig;
