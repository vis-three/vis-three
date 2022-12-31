import { Strategy } from "@vis-three/core";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
export interface OrbitRenderEngine extends OrbitControlsEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const OrbitRenderStrategy: Strategy<OrbitRenderEngine>;
