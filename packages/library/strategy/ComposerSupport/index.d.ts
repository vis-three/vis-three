import { Strategy } from "@vis-three/core";
import { EngineSupport } from "@vis-three/tdcm";
import { PassModuleEngine } from "@vis-three/module-pass";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";
export interface ComposerSupportEngine extends EngineSupport, EffectComposerEngine, PassModuleEngine {
}
export declare const name: string;
export declare const ComposerSupportStrategy: Strategy<ComposerSupportEngine, object>;
