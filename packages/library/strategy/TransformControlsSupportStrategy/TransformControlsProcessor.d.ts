import { EngineSupport } from "@vis-three/middleware";
import { ControlsCompiler, ControlsConfig } from "@vis-three/module-controls";
import { TransformControlsEngine, TransformControls } from "@vis-three/plugin-transform-controls";
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
export declare const getTransformControlsConfig: () => TransformControlsConfig;
export interface TransformControlsSupportEngine extends EngineSupport, TransformControlsEngine {
}
declare const _default: import("@vis-three/middleware").Processor<TransformControlsConfig, TransformControls, TransformControlsSupportEngine, ControlsCompiler>;
export default _default;
