import { SymbolConfig } from "../common";
import { Compiler } from "../compiler";
import { ProxyNotice } from "../dataContainer";
import { Rule } from "../rule";
export declare class Translater<S extends SymbolConfig, O extends object, C extends Compiler<S, O>> {
    private rule;
    private members;
    apply(compiler: C): this;
    cancel(compiler: C): this;
    setRule(rule: Rule<C>): this;
    translate(notice: ProxyNotice): this;
}
