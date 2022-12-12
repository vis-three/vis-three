import { Engine, Plugin } from "@vis-three/core";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export interface CSS3DRendererEngine extends Engine {
    css3DRenderer: CSS3DRenderer;
}
export declare const name: string;
export declare const CSS3DRendererPlugin: Plugin<CSS3DRendererEngine>;
