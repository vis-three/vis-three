import { Compiler, CompilerTarget } from "./Compiler";
import { Rule } from "./Rule";
export declare class DataSupport<D extends CompilerTarget, C extends Compiler> {
    private data;
    private broadcast;
    private translater;
    constructor(rule: Rule<C>, data: D);
    getData(): D;
    setData(data: D): this;
    addCompiler(compiler: C): this;
    toJSON(): string;
    load(config: D): this;
}
