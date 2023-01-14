import { Engine, Plugin } from "@vis-three/core";
import { VisTransformControls } from "./VisTransformControls";
export * from "./VisTransformControls";
export interface TransformControlsEngine extends Engine {
    transing: boolean;
    transformControls: VisTransformControls;
    setTransformControls: (show: boolean) => TransformControlsEngine;
}
export declare const TRANSFORM_CONTROLS_PLUGIN: string;
export declare const TransformControlsPlugin: Plugin<TransformControlsEngine>;
