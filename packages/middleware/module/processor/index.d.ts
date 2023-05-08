import { DeepIntersection, DeepPartial, DeepRecord, DeepUnion } from "@vis-three/utils";
import { SymbolConfig } from "../common";
import { EngineSupport } from "../../engine";
import { CompileNotice, Compiler } from "../compiler";
export interface ProcessParams<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<any, any>> extends CompileNotice {
    config: S;
    target: T;
    compiler: C;
    engine: E;
    processor: Processor<S, T, E, C>;
}
export type RegCommand<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<S, T>> = {
    reg: RegExp;
    handler: (params: ProcessParams<S, T, E, C>) => void;
};
export type KeyCommand<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<S, T>> = (params: ProcessParams<S, T, E, C>) => void;
export type CommandStructure<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<S, T>> = DeepIntersection<DeepPartial<DeepRecord<DeepUnion<S, KeyCommand<S, T, E, C>>, KeyCommand<S, T, E, C>>>, {
    $reg?: RegCommand<S, T, E, C>[];
}>;
export interface ProcessorCommands<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<any, any>> {
    add?: CommandStructure<S, T, E, C>;
    set?: CommandStructure<S, T, E, C>;
    delete?: CommandStructure<S, T, E, C>;
}
export interface ProcessorOptions<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<S, T>> {
    type: string;
    config: () => S;
    commands?: ProcessorCommands<S, T, E, C>;
    create: (config: S, engine: E, compiler: C) => T;
    dispose: (target: T, engine: E, compiler: C) => void;
}
export type DefineProcessor = <S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<any, any>>(options: ProcessorOptions<S, T, E, C>) => Processor<S, T, E, C>;
export declare class Processor<S extends SymbolConfig, T extends object, E extends EngineSupport, C extends Compiler<S, T>> {
    type: string;
    config: () => S;
    commands?: ProcessorCommands<S, T, E, C>;
    create: (config: S, engine: E, compiler: C) => T;
    dispose: (target: T, engine: E, compiler: C) => void;
    constructor(options: ProcessorOptions<S, T, E, C>);
    process(params: ProcessParams<S, T, E, C>): void;
    add(params: ProcessParams<S, T, E, C>): void;
    set(params: ProcessParams<S, T, E, C>): void;
    delete(params: ProcessParams<S, T, E, C>): void;
}
export declare const defineProcessor: DefineProcessor;
