import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { PassConfigAllType } from "./PassConfig";
import { EngineSupport } from "../../engine/EngineSupport";
export interface PassCompilerTarget extends CompilerTarget {
    [key: string]: PassConfigAllType;
}
export interface PassCompilerParameters {
    target?: PassCompilerTarget;
    composer?: EffectComposer;
}
export declare class PassCompiler extends Compiler {
    private target;
    private map;
    private constructMap;
    private composer;
    private width;
    private height;
    constructor(parameters?: PassCompilerParameters);
    setTarget(target: PassCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    add(config: PassConfigAllType): void;
    /**
     * @todo
     */
    set(): void;
    remove(vid: string): this;
    compileAll(): this;
    dispose(): this;
}
