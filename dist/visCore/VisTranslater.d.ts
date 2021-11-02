import { VisCompiler } from "../visCompiler/VisCompiler";
import { VisRule } from "../visRule/VisRule";
import { VisProxyNotice } from "./VisProxyBroadcast";
export declare class VisTranslater<C extends VisCompiler> {
    private rule;
    private memberSet;
    constructor();
    apply(compiler: C): this;
    cancel(compiler: C): this;
    setRule(rule: VisRule<C>): this;
    translate(notice: VisProxyNotice): this;
}
//# sourceMappingURL=VisTranslater.d.ts.map