import { Strategy } from "@vis-three/core";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
import { ViewpointEngine } from "@vis-three/viewpoint-plugin";
export interface OrbitViewpointEngine extends OrbitControlsEngine, ViewpointEngine {
}
export declare const name: string;
export declare const CSS2DRenderStrategy: Strategy<OrbitViewpointEngine>;
