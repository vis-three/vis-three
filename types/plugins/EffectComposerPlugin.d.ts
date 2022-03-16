import { Plugin } from "./plugin";
export interface EffectComposerParameters {
    WebGLMultisampleRenderTarget?: boolean;
    samples?: number;
    format?: number;
}
export declare const EffectComposerPlugin: Plugin<EffectComposerParameters>;
