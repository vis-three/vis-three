import { Engine, Plugin } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
export * from "./RenderManager";
export interface RenderManagerPluginParams {
    fps?: number;
}
export declare const RENDER_MANAGER_PLUGIN: string;
export interface RenderManagerEngine extends Engine {
    renderManager: RenderManager;
    play: () => void;
    stop: () => void;
}
export declare const RenderManagerPlugin: Plugin<RenderManagerEngine, RenderManagerPluginParams>;
