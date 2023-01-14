import { ObjectHelperEngine } from "@vis-three/object-helper-plugin";
import { TransformControlsEngine } from "@vis-three/transform-controls-plugin";
import { Strategy } from "@vis-three/core";
export interface TransformHelperEngine extends TransformControlsEngine, ObjectHelperEngine {
}
export declare const TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY: string;
export declare const TransformControlsHelperFilterStrategy: Strategy<TransformHelperEngine>;
