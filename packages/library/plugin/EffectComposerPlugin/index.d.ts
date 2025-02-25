import { Plugin } from "@vis-three/core";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";
export interface EffectComposerParameters {
    /**采样数 */
    samples?: number;
    /**渲染格式 */
    format?: number;
    /**是否开启msaa */
    MSAA?: boolean;
}
export interface EffectComposerEngine extends WebGLRendererEngine {
    effectComposer: EffectComposer;
}
export declare const EFFECT_COMPOSER_PLUGIN: string;
export declare const EffectComposerPlugin: Plugin<EffectComposerEngine, EffectComposerParameters>;
