import { EngineSupport, TransformControlsConfig } from "@vis-three/middleware";
import { TransformControlsEngine, VisTransformControls } from "@vis-three/transform-controls-plugin";
export interface TransformControlsSupportEngine extends EngineSupport, TransformControlsEngine {
}
declare const _default: import("@vis-three/middleware").Processor<TransformControlsConfig, VisTransformControls, TransformControlsSupportEngine>;
export default _default;
