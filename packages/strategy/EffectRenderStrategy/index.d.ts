import { RenderManagerEngine } from "@vis-three/plugin-render-manager";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";
import { Strategy } from "@vis-three/core";
export interface EffectRenderEngine extends EffectComposerEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const EffectRenderStrategy: Strategy<EffectRenderEngine>;
