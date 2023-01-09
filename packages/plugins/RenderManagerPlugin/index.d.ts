import { Engine } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
export * from "./RenderManager";
export declare const RENDER_MANAGER_PLUGIN: string;
export interface RenderManagerEngine extends Engine {
    renderManager: RenderManager;
    play: () => void;
    stop: () => void;
}
export declare const RenderManagerPlugin: import("@vis-three/core").Plugin<RenderManagerEngine>;
