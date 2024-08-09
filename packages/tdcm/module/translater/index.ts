import { BasicConfig } from "../common";
import { Compiler } from "../compiler";
import { CtnNotice } from "../container";
import { Ruler } from "../ruler";

export class Translater<C extends Compiler = Compiler> {
  private ruler!: Ruler;
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

  setRuler(ruler: Ruler): this {
    this.ruler = ruler;
    return this;
  }

  translate(notice: CtnNotice): this {
    // const rule = this.rule;

    // for (const compiler of this.members) {
    //   rule(notice, compiler);
    // }
    return this;
  }
}
