import { CSS3DRendererEngine } from "@vis-three/css3d-renderer-plugin";
import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { Strategy } from "@vis-three/core";
export interface CSS3DAndRenderEngine extends CSS3DRendererEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const CSS3DRenderStrategy: Strategy<CSS3DAndRenderEngine>;
