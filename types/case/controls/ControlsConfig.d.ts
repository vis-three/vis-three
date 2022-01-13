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
export declare type ControlsAllConfig = TransformControlsConfig;
export declare const getTransformControlsConfig: () => TransformControlsConfig;
