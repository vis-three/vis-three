import { Engine, Plugin } from "@vis-three/core";
import { CSS2DRenderer } from "three/examples/jsm/renderers/CSS2DRenderer";
export interface CSS2DRendererEngine extends Engine {
    css2DRenderer: CSS2DRenderer;
}
export declare const name: string;
export declare const CSS2DRendererPlugin: Plugin<CSS2DRendererEngine>;
