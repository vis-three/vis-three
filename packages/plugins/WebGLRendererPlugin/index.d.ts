import { RenderManagerEngine, Plugin } from "@vis-three/core";
import { WebGLRenderer } from "three";
export interface Screenshot {
    width?: number;
    height?: number;
    mine?: string;
}
export interface WebGLRendererEngine extends RenderManagerEngine {
    webGLRenderer: WebGLRenderer;
    getScreenshot: (params?: Screenshot) => Promise<string>;
}
export declare const WebGLRendererPlugin: Plugin<WebGLRendererEngine>;
