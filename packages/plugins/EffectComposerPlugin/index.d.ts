import { Plugin } from "@vis-three/core";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
export interface EffectComposerParameters {
    WebGLMultisampleRenderTarget?: boolean;
    samples?: number;
    format?: number;
    MSAA?: boolean;
}
export interface EffectComposerEngine extends WebGLRendererEngine {
    effectComposer: EffectComposer;
}
export declare const name: string;
export declare const EffectComposerPlugin: Plugin<EffectComposerEngine>;
