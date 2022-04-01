import { SymbolConfig, Vector3Config } from "../common/CommonConfig";
export interface GeometryConfig extends SymbolConfig {
    type: string;
    position: Vector3Config;
    rotation: Vector3Config;
    scale: Vector3Config;
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
export interface LoadGeometryConfig extends GeometryConfig {
    url: string;
}
export declare const getGeometryConfig: () => GeometryConfig;
export declare const getBoxGeometryConfig: () => BoxGeometryConfig;
export declare const getSphereGeometryConfig: () => SphereGeometryConfig;
export declare const getPlaneGeometryConfig: () => PlaneGeometryConfig;
export declare const getLoadGeometryConfig: () => LoadGeometryConfig;
export declare type GeometryAllType = BoxGeometryConfig | SphereGeometryConfig | PlaneGeometryConfig | LoadGeometryConfig;
