import { Strategy } from "@vis-three/core";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
export interface WebGLRenderEngine extends WebGLRendererEngine, RenderManagerEngine {
}
export declare const WEBGL_RENDER_STRATEGY: string;
export declare const WebGLRendererStrategy: Strategy<WebGLRenderEngine>;
