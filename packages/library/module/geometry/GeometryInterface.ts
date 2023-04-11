import { SymbolConfig, Vector3Config } from "@vis-three/middleware";
import { Vector2, Vector3 } from "three";

export interface GeometryGroup {
  start: number;
  count: number;
  materialIndex: number;
}
export interface GeometryConfig extends SymbolConfig {
  type: string;
  center: boolean;
  position: Vector3Config;
  rotation: Vector3Config;
  scale: Vector3Config;
  groups: GeometryGroup[];
}

export interface BoxGeometryConfig extends GeometryConfig {
  width: number;
  height: number;
  depth: number;
  widthSegments: number;
  heightSegments: number;
  depthSegments: number;
}

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

export interface LoadGeometryConfig extends GeometryConfig {
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

export interface CurveGeometryConfig extends GeometryConfig {
  path: Vector3Config[];
  divisions: number;
  space: boolean;
}

export interface LineCurveGeometryConfig extends CurveGeometryConfig {}

export interface SplineCurveGeometryConfig extends CurveGeometryConfig {}

export interface CubicBezierCurveGeometryConfig extends CurveGeometryConfig {}

export interface QuadraticBezierCurveGeometryConfig
  extends CurveGeometryConfig {}

export interface TubeGeometryConfig extends GeometryConfig {
  path: Vector3[];
  tubularSegments: number;
  radius: number;
  radialSegments: number;
  closed: boolean;
}

export interface LineTubeGeometryConfig extends TubeGeometryConfig {}

export interface SplineTubeGeometryConfig extends TubeGeometryConfig {}

export interface ShapeGeometryConfig extends GeometryConfig {
  shape: string;
  curveSegments: number;
}

export interface LineShapeGeometryConfig extends GeometryConfig {
  path: Vector2[];
  curveSegments: number;
}

export interface ExtrudeGeometryConfig extends GeometryConfig {
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
