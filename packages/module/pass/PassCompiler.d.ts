import { Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { PassConfigAllType } from "./PassConfig";
import { Compiler, EngineSupport } from "@vis-three/middleware";
import { EffectComposerEngine } from "@vis-three/effect-composer-plugin";
export interface ComposerSupportEngine extends EngineSupport, EffectComposerEngine {
}
export declare class PassCompiler extends Compiler<PassConfigAllType, Pass> {
    private composer;
    constructor();
    useEngine(engine: ComposerSupportEngine): this;
    add(config: PassConfigAllType): Pass | null;
    remove(config: PassConfigAllType): this;
}
