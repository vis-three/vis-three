import { Strategy } from "@vis-three/core";
import { CSS2DRendererEngine } from "@vis-three/css2d-renderer-plugin";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
export interface CSS2DAndRenderEngine extends CSS2DRendererEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const CSS2DRenderStrategy: Strategy<CSS2DAndRenderEngine>;
