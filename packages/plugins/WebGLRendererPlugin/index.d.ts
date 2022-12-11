import { Engine, Plugin } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { WebGLRenderer } from "three";
export interface Screenshot {
    width?: number;
    height?: number;
    mine?: string;
}
export interface WebGLRendererEngine extends Engine {
    webGLRenderer: WebGLRenderer;
    getScreenshot: (params?: Screenshot) => Promise<string>;
}
export interface WebGLAndRenderEngine extends WebGLRendererEngine, RenderManagerEngine {
    webGLRenderer: WebGLRenderer;
    getScreenshot: (params?: Screenshot) => Promise<string>;
}
export declare const WebGLRendererPlugin: Plugin<WebGLRendererEngine>;
