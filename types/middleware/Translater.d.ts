import { Compiler } from "./Compiler";
import { ProxyNotice } from "./ProxyBroadcast";
import { Rule } from "./Rule";
export declare class Translater<C extends Compiler> {
    private rule;
    private memberSet;
    constructor();
    apply(compiler: C): this;
    cancel(compiler: C): this;
    setRule(rule: Rule<C>): this;
    translate(notice: ProxyNotice): this;
}
