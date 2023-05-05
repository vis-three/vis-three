import { Strategy } from "@vis-three/core";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
export interface OrbitRenderEngine extends OrbitControlsEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const OrbitRenderStrategy: Strategy<OrbitRenderEngine, object>;
