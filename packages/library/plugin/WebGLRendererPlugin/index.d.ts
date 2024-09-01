import { Engine, Plugin } from "@vis-three/core";
import { WebGLRenderer, WebGLRendererParameters } from "three";
export interface Screenshot {
    width?: number;
    height?: number;
    mine?: string;
}
export interface WebGLRendererEngine extends Engine {
    /**webgl渲染器 */
    webGLRenderer: WebGLRenderer;
    /**获取webGL渲染截图 */
    getScreenshot: (params?: Screenshot) => Promise<string>;
}
export declare const WEBGL_RENDERER_PLUGIN: string;
export declare const WebGLRendererPlugin: Plugin<WebGLRendererEngine, WebGLRendererParameters>;
