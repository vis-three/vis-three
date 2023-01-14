import { VisOrbitControls } from "@vis-three/core";
import { EngineSupport, OrbitControlsConfig } from "@vis-three/middleware";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
export interface OrbitControlsSupportEngine extends EngineSupport, OrbitControlsEngine {
}
declare const _default: import("@vis-three/middleware").Processor<OrbitControlsConfig, VisOrbitControls, OrbitControlsSupportEngine>;
export default _default;
