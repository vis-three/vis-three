import { Strategy } from "@vis-three/core";
import { EngineSupport } from "@vis-three/middleware";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";
export interface ComposerSupportEngine extends EngineSupport, EffectComposerEngine {
}
export declare const name: string;
export declare const ComposerSupportStrategy: Strategy<ComposerSupportEngine>;
