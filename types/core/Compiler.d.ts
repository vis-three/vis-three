import { SymbolConfig } from "../middleware/common/CommonConfig";
import { EngineSupport } from "../engine/EngineSupport";
export interface CompilerTarget {
    [key: string]: SymbolConfig;
}
export declare abstract class Compiler {
    static applyConfig<C extends SymbolConfig, O>(config: C, object: O, filter?: object, callBack?: Function): void;
    constructor();
    abstract setTarget(parameter: unknown): this;
    abstract useEngine(engine: EngineSupport): this;
    abstract compileAll(): this;
    abstract dispose(parameter: unknown): this;
}
