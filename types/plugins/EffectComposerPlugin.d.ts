import { Plugin } from "./plugin";
export interface EffectComposerParameters {
    WebGLMultisampleRenderTarget?: boolean;
    samples?: number;
    format?: number;
    MSAA?: boolean;
}
export declare const EffectComposerPlugin: Plugin<EffectComposerParameters>;
