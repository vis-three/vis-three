import { SymbolConfig } from "../middleware/common/CommonConfig";
import { MODULETYPE } from "../middleware/constants/MODULETYPE";
import { Compiler, CompilerTarget } from "./Compiler";
import { Rule } from "./Rule";
export declare abstract class DataSupport<D extends CompilerTarget, C extends Compiler> {
    abstract MODULE: MODULETYPE;
    private data;
    private broadcast;
    private translater;
    constructor(rule: Rule<C>, data: D);
    getData(): D;
    setData(data: D): this;
    proxyData(data: D): D;
    existSymbol(vid: string): boolean;
    addConfig(config: valueOf<D>): this;
    getConfig<T extends SymbolConfig>(vid: string): T;
    removeConfig(vid: string): void;
    addCompiler(compiler: C): this;
    toJSON(): string;
    load(config: D): this;
    remove(config: D): this;
    getModule(): MODULETYPE;
}
