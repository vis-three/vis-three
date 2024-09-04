import { Strategy } from "@vis-three/core";
import { CSS3DRendererEngine } from "@vis-three/plugin-css3d-renderer";
import { CSS2DRendererEngine } from "@vis-three/plugin-css2d-renderer";
export interface MultiRendererEventEngine extends CSS3DRendererEngine, CSS2DRendererEngine {
}
export declare const MULTI_RENDERER_EVENT: string;
export declare const MultiRendererEventStrategy: Strategy<MultiRendererEventEngine>;
