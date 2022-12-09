import { SymbolConfig } from "../middleware/common/CommonConfig";
import { Compiler } from "../compiler";
import { ProxyNotice } from "../dataContainer";
import { Rule } from "../rule/rule";

export class Translater<
  S extends SymbolConfig,
  O extends object,
  C extends Compiler<S, O>
> {
  private rule: Rule<C>;
  private memberSet: Set<C>;

  constructor() {
    this.rule = function () {};
    this.memberSet = new Set();
  }

  apply(compiler: C): this {
    this.memberSet.add(compiler);
    return this;
  }

  cancel(compiler: C): this {
    this.memberSet.delete(compiler);
    return this;
  }

  setRule(rule: Rule<C>): this {
    this.rule = rule;
    return this;
  }

  translate(notice: ProxyNotice): this {
    const rule = this.rule;
    this.memberSet.forEach((compiler) => {
      rule(notice, compiler);
    });
    return this;
  }
}
