import { CSS3DRendererEngine } from "@vis-three/plugin-css3d-renderer";
import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { Strategy } from "@vis-three/core";
export interface CSS3DAndRenderEngine extends CSS3DRendererEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const CSS3DRenderStrategy: Strategy<CSS3DAndRenderEngine>;
