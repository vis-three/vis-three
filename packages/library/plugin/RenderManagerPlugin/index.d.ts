import { Engine, Plugin } from "@vis-three/core";
import { RenderManager } from "./RenderManager";
export * from "./RenderManager";
export interface RenderManagerPluginParams {
    fps?: number;
}
export declare const RENDER_MANAGER_PLUGIN: string;
export interface RenderManagerEngine extends Engine {
    /**渲染管理器 */
    renderManager: RenderManager;
    /**开始渲染函数 */
    play: () => void;
    /**停止渲染函数 */
    stop: () => void;
}
export declare const RenderManagerPlugin: Plugin<RenderManagerEngine, RenderManagerPluginParams>;
