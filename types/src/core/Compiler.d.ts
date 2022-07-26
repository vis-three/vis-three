import { SymbolConfig } from "../middleware/common/CommonConfig";
import { EngineSupport } from "../engine/EngineSupport";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { ProxyNotice } from "./ProxyBroadcast";
import { Processor2 } from "./Processor";
export interface CompilerTarget<C extends SymbolConfig> {
    [key: string]: C;
}
export declare type BasicCompiler = Compiler<SymbolConfig, CompilerTarget<SymbolConfig>, object>;
export declare abstract class Compiler<C extends SymbolConfig, T extends CompilerTarget<C>, O extends object> {
    static processors: Map<string, Processor2<SymbolConfig, object>>;
    static processor: <C_1 extends SymbolConfig, T_1 extends object>(processor: Processor2<C_1, T_1>) => void;
    abstract MODULE: MODULETYPE;
    target: T;
    map: Map<SymbolConfig["vid"], O>;
    weakMap: WeakMap<O, SymbolConfig["vid"]>;
    engine: EngineSupport;
    private cacheCompile?;
    constructor();
    getMap(): Map<SymbolConfig["vid"], O>;
    useEngine(engine: EngineSupport): this;
    setTarget(target: T): this;
    add(config: C): O | null;
    remove(config: C): this;
    cover(config: C): this;
    compile(vid: SymbolConfig["vid"], notice: ProxyNotice): this;
    compileAll(): this;
    dispose(): this;
    getObjectSymbol(object: O): string | null;
    getObjectBySymbol(vid: string): O | null;
}
