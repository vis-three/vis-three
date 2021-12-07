import { SymbolConfig } from "../case/common/CommonConfig";
export interface CompilerTarget {
    [key: string]: SymbolConfig;
}
export declare abstract class Compiler {
    static applyConfig<C extends SymbolConfig, O>(config: C, object: O, callBack?: Function): void;
    constructor();
    abstract setTarget(parameter: unknown): this;
    abstract compileAll(): this;
    abstract dispose(parameter: unknown): this;
}
