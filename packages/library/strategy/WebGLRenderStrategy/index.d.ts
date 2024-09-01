import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";
export interface WebGLRenderEngine extends WebGLRendererEngine, RenderManagerEngine {
}
export declare const WEBGL_RENDER_STRATEGY: string;
export declare const WebGLRenderStrategy: Strategy<WebGLRenderEngine>;
