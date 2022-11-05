import { SymbolConfig } from "../middleware/common/CommonConfig";
import { Compiler } from "./Compiler";
import { ProxyNotice } from "./DataContainer";
import { Rule } from "./Rule";
export declare class Translater<
  S extends SymbolConfig,
  O extends object,
  C extends Compiler<S, O>
> {
  private rule;
  private memberSet;
  constructor();
  apply(compiler: C): this;
  cancel(compiler: C): this;
  setRule(rule: Rule<C>): this;
  translate(notice: ProxyNotice): this;
}
