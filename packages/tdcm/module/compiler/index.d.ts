import { SymbolConfig } from "../common";
import { EngineSupport } from "../../engine";
import { ProxyNotice } from "../dataContainer";
import { Processor } from "../processor";
export type CompilerTarget<C extends SymbolConfig> = Record<string, C>;
export type BasicCompiler = Compiler<SymbolConfig, object>;
export type CompileNotice = Omit<ProxyNotice, "path"> & {
    path: string[];
};
export declare enum COMPILER_EVENT {
    ADD = "compiler.add",
    REMOVE = "compiler.remove",
    COMPILE = "compiler.compile",
    UPDATE = "compiler.update"
}
export declare class Compiler<C extends SymbolConfig, O extends object> {
    MODULE: string;
    processors: Map<string, Processor<SymbolConfig, object, EngineSupport, any>>;
    target: CompilerTarget<C>;
    map: Map<SymbolConfig["vid"], O>;
    weakMap: WeakMap<O, SymbolConfig["vid"]>;
    engine: EngineSupport;
    cacheCompile?: {
        target: O;
        config: C;
        processor: Processor<SymbolConfig, object, EngineSupport, any>;
        vid: string;
    };
    getMap(): Map<SymbolConfig["vid"], O>;
    useEngine(engine: EngineSupport): this;
    setTarget(target: CompilerTarget<C>): this;
    add(config: C): O | null;
    remove(config: C): this;
    cover(config: C): this;
    compile(vid: SymbolConfig["vid"], notice: CompileNotice): this;
    compileAll(): this;
    dispose(): this;
    reigstProcessor(processor: Processor<any, any, any, any>, fun: (compiler: Compiler<C, O>) => void): this;
    getObjectSymbol(object: O): string | null;
    getObjectBySymbol(vid: string): O | null;
}
export interface CompilerSimplifier<C extends SymbolConfig, O extends object> {
    new (): Compiler<C, O>;
}
export declare const CompilerFactory: <C extends SymbolConfig, O extends object>(type: string, compiler: {
    new (): Compiler<C, O>;
}, processors: Processor<any, any, any, any>[]) => CompilerSimplifier<C, O>;
