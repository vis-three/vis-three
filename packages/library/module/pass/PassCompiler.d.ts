import { PassConfigAllType } from "./PassConfig";
import { Compiler, CompilerParameters, EngineSupport } from "@vis-three/tdcm";
import { EffectComposerEngine } from "@vis-three/plugin-effect-composer";
export interface PassModuleEngine extends EngineSupport, EffectComposerEngine {
}
export declare class PassCompiler extends Compiler<PassModuleEngine> {
    private composer;
    constructor(params: CompilerParameters<PassModuleEngine>);
    useEngine(engine: any): this;
    add(config: PassConfigAllType): any;
    remove(config: PassConfigAllType): this;
}
