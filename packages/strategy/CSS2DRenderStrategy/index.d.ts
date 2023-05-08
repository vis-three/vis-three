import { Strategy } from "@vis-three/core";
import { CSS2DRendererEngine } from "@vis-three/plugin-css2d-renderer";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
export interface CSS2DAndRenderEngine extends CSS2DRendererEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const CSS2DRenderStrategy: Strategy<CSS2DAndRenderEngine>;
