import { EngineSupport } from "@vis-three/middleware";
import { ControlsCompiler } from "@vis-three/middleware/controls/ControlsCompiler";
import { ControlsConfig } from "@vis-three/middleware/controls/ControlsConfig";
import { TransformControlsEngine, VisTransformControls } from "@vis-three/transform-controls-plugin";
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
declare const _default: import("@vis-three/middleware").Processor<TransformControlsConfig, VisTransformControls, TransformControlsSupportEngine, ControlsCompiler>;
export default _default;
