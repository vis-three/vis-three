import { Strategy } from "@vis-three/core";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
import { ViewpointEngine } from "@vis-three/plugin-viewpoint";
export interface OrbitViewpointEngine extends OrbitControlsEngine, ViewpointEngine {
}
export declare const name: string;
export declare const OrbitViewpointStrategy: Strategy<OrbitViewpointEngine, object>;
