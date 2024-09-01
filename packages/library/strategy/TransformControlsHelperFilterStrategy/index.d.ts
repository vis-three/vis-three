import { ObjectHelperEngine } from "@vis-three/plugin-object-helper";
import { TransformControlsEngine } from "@vis-three/plugin-transform-controls";
import { Strategy } from "@vis-three/core";
export interface TransformHelperEngine extends TransformControlsEngine, ObjectHelperEngine {
}
export declare const TRANSFORM_CONTROLS_OBJECT_HELPER_STRATEGY: string;
export declare const TransformControlsHelperFilterStrategy: Strategy<TransformHelperEngine>;
