import { SymbolConfig } from "../case/common/CommonConfig";
export interface CompilerTarget {
    [key: string]: unknown;
}
export declare abstract class Compiler {
    static applyConfig<C extends SymbolConfig, O>(config: C, object: O, callBack?: Function): void;
    constructor();
    abstract compileAll(parameter: unknown): this;
    abstract dispose(parameter: unknown): this;
}
