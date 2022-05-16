import { WebGLRendererParameters } from "three";
import { Plugin } from "./plugin";
export interface Screenshot {
    width?: number;
    height?: number;
    mine?: string;
}
export declare const WebGLRendererPlugin: Plugin<WebGLRendererParameters>;
