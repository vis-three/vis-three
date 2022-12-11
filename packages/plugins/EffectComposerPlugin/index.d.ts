import { Plugin, RenderManagerEngine } from "@vis-three/core";
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
export interface ComposerRenderEngine extends EffectComposerEngine, RenderManagerEngine {
}
export declare const EffectComposerPlugin: Plugin<EffectComposerEngine>;
