import { Pass } from "three/examples/jsm/postprocessing/EffectComposer";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { PassConfigAllType } from "./PassConfig";
import { EngineSupport } from "../../engine/EngineSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface PassCompilerTarget extends CompilerTarget {
    [key: string]: PassConfigAllType;
}
export declare class PassCompiler extends Compiler {
    MODULE: MODULETYPE;
    private target;
    private map;
    private weakMap;
    private constructMap;
    private composer;
    private width;
    private height;
    constructor();
    setTarget(target: PassCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    add(config: PassConfigAllType): void;
    set(vid: string, path: string[], key: string, value: any): this;
    remove(vid: string): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(object: Pass): string | null;
    getObjectBySymbol(vid: string): Pass | null;
}
