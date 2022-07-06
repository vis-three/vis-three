import { Vector3 } from "three";
import { SymbolConfig, Vector3Config } from "../common/CommonConfig";
export interface GeometryGroup {
    start: number;
    count: number;
    materialIndex: number;
}
export interface GeometryConfig extends SymbolConfig {
    type: string;
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
export interface LineCurveGeometryConfig extends CurveGeometryConfig {
}
export interface SplineCurveGeometryConfig extends CurveGeometryConfig {
}
export interface CubicBezierCurveGeometryConfig extends CurveGeometryConfig {
}
export interface QuadraticBezierCurveGeometryConfig extends CurveGeometryConfig {
}
export interface TubeGeometryConfig extends GeometryConfig {
    path: Vector3[];
    tubularSegments: number;
    radius: number;
    radialSegments: number;
    closed: boolean;
}
export interface LineTubeGeometryConfig extends TubeGeometryConfig {
}
export interface SplineTubeGeometryConfig extends TubeGeometryConfig {
}
export declare type GeometryAllType = BoxGeometryConfig | SphereGeometryConfig | PlaneGeometryConfig | LoadGeometryConfig | CircleGeometryConfig | ConeGeometryConfig | CylinderGeometryConfig | DodecahedronGeometryConfig | EdgesGeometryConfig | LineCurveGeometryConfig | SplineCurveGeometryConfig | CubicBezierCurveGeometryConfig | QuadraticBezierCurveGeometryConfig | CustomGeometryConfig | LineTubeGeometryConfig | SplineTubeGeometryConfig;
export declare const getGeometryConfig: () => GeometryConfig;
export declare const getBoxGeometryConfig: () => BoxGeometryConfig;
export declare const getSphereGeometryConfig: () => SphereGeometryConfig;
export declare const getPlaneGeometryConfig: () => PlaneGeometryConfig;
export declare const getCircleGeometryConfig: () => CircleGeometryConfig;
export declare const getConeGeometryConfig: () => ConeGeometryConfig;
export declare const getLoadGeometryConfig: () => LoadGeometryConfig;
export declare const getCustomGeometryConfig: () => CustomGeometryConfig;
export declare const getCylinderGeometryConfig: () => CylinderGeometryConfig;
export declare const getDodecahedronGeometryConfig: () => DodecahedronGeometryConfig;
export declare const getEdgesGeometryConfig: () => EdgesGeometryConfig;
export declare const getLineCurveGeometryConfig: () => LineCurveGeometryConfig;
export declare const getSplineCurveGeometryConfig: () => SplineCurveGeometryConfig;
export declare const getCubicBezierCurveGeometryConfig: () => CubicBezierCurveGeometryConfig;
export declare const getQuadraticBezierCurveGeometryConfig: () => QuadraticBezierCurveGeometryConfig;
export declare const getTubeGeometryConfig: () => TubeGeometryConfig;
export declare const getLineTubeGeometryConfig: () => LineTubeGeometryConfig;
export declare const getSplineTubeGeometryConfig: () => SplineTubeGeometryConfig;
