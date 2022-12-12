import { Engine } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
export * from "./RenderManager";
export declare const name: string;
export interface RenderManagerEngine extends Engine {
    renderManager: RenderManager;
    render: () => void;
    play: () => void;
    stop: () => void;
}
export declare const RenderManagerPlugin: import("@vis-three/core").Plugin<RenderManagerEngine>;
