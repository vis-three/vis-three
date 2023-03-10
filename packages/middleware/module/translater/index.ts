import { SymbolConfig } from "../common";
import { Compiler } from "../compiler";
import { ProxyNotice } from "../dataContainer";
import { Rule } from "../rule";

export class Translater<
  S extends SymbolConfig,
  O extends object,
  C extends Compiler<S, O>
> {
  private rule: Rule<C> = () => {};
  private members: Array<C> = [];

  apply(compiler: C): this {
    if (!this.members.includes(compiler)) {
      this.members.push(compiler);
    }
    return this;
  }

  cancel(compiler: C): this {
    if (this.members.includes(compiler)) {
      this.members.splice(this.members.indexOf(compiler), 1);
    }
    return this;
  }

  setRule(rule: Rule<C>): this {
    this.rule = rule;
    return this;
  }

  translate(notice: ProxyNotice): this {
    const rule = this.rule;

    for (const compiler of this.members) {
      rule(notice, compiler);
    }
    return this;
  }
}
