import { SymbolConfig } from "../common/CommonConfig";
export interface ControlsConfig extends SymbolConfig {
}
export interface TransformControlsConfig extends ControlsConfig {
    axis: string;
    enabled: boolean;
    mode: string;
    snapAllow: boolean;
    rotationSnap: number;
    translationSnap: number;
    scaleSnap: number;
    showX: boolean;
    showY: boolean;
    showZ: boolean;
    size: number;
    space: string;
}
export interface OrbitControlsConfig extends ControlsConfig {
    autoRotate: boolean;
    autoRotateSpeed: number;
    enableDamping: boolean;
    dampingFactor: number;
    enabled: boolean;
    enablePan: boolean;
    enableRotate: boolean;
    enableZoom: boolean;
    maxAzimuthAngle: number;
    maxDistance: number;
    maxPolarAngle: number;
    maxZoom: number;
    minAzimuthAngle: number;
    minDistance: number;
    minPolarAngle: number;
    minZoom: number;
    panSpeed: number;
    rotateSpeed: number;
    zoomSpeed: number;
    screenSpacePanning: boolean;
}
export declare type ControlsAllConfig = TransformControlsConfig | OrbitControlsConfig;
export declare const getTransformControlsConfig: () => TransformControlsConfig;
export declare const getOrbitControlsConfig: () => OrbitControlsConfig;
