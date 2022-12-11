import { Engine, Plugin, RenderManagerEngine, VisOrbitControls } from "@vis-three/core";
import { ViewpointEngine } from "@vis-three/viewpoint-plugin";
export interface OrbitControlsEngine extends Engine {
    orbitControls: VisOrbitControls;
}
export interface OrbitRenderEngine extends OrbitControlsEngine, RenderManagerEngine {
}
export interface OrbitViewpointEngine extends OrbitControlsEngine, ViewpointEngine {
}
export declare const OrbitControlsPlugin: Plugin<OrbitControlsEngine>;
