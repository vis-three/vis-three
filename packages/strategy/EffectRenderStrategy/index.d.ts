import { RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { EffectComposerEngine } from "@vis-three/effect-composer-plugin";
import { Strategy } from "@vis-three/core";
export interface EffectRenderEngine extends EffectComposerEngine, RenderManagerEngine {
}
export declare const name: string;
export declare const EffectRenderStrategy: Strategy<EffectRenderEngine>;
