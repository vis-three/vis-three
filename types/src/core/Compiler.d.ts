import { SymbolConfig } from "../middleware/common/CommonConfig";
import { EngineSupport } from "../engine/EngineSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
export interface CompilerTarget {
    [key: string]: SymbolConfig;
}
export declare abstract class Compiler {
    static applyConfig<C extends SymbolConfig, O>(config: C, object: O, filter?: object, callBack?: Function): void;
    constructor();
    abstract MODULE: MODULETYPE;
    abstract getObjectSymbol(object: any): string | null;
    abstract getObjectBySymbol(vid: string): any | null;
    abstract setTarget(parameter: unknown): this;
    abstract useEngine(engine: EngineSupport): this;
    abstract compileAll(): this;
    abstract dispose(parameter: unknown): this;
}
