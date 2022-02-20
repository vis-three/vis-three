import { SymbolConfig } from "../middleware/common/CommonConfig";
export interface CompilerTarget {
    [key: string]: SymbolConfig;
}
export interface ObjectCompiler {
    readonly IS_OBJECTCOMPILER: boolean;
    add: Function;
    remove: Function;
    getSupportVid(parameter: unknown): SymbolConfig['vid'] | null;
}
export declare abstract class Compiler {
    static applyConfig<C extends SymbolConfig, O>(config: C, object: O, callBack?: Function): void;
    constructor();
    abstract setTarget(parameter: unknown): this;
    abstract compileAll(): this;
    abstract dispose(parameter: unknown): this;
}
