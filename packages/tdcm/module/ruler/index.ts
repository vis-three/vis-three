import { globalOption } from "../../option";
import { Compiler } from "../compiler";
import { CtnNotice } from "../container";

export type Rule = (input: CtnNotice, compiler: Compiler) => boolean;

export const DEFAULT_RULE: Record<string, Rule> = {
  SYMBOL_VALIDATOR(input) {
    return !globalOption.symbol.validator(input.symbol);
  },
  OPERATE_ADD({ operate, path, symbol, key, value }, compiler) {
    if (operate === "add" && !path.length && symbol === key) {
      compiler.add(value);
      return false;
    } else {
      return true;
    }
  },
  OPERATE_DELETE({ operate, path, value }, compiler) {
    if (operate === "delete" && !path.length) {
      compiler.remove(value);
      return false;
    } else {
      return true;
    }
  },
  OPERATE_COVER({ operate, path, value, key, symbol }, compiler) {
    if (operate === "set" && !path.length && key === symbol) {
      compiler.cover(value);
      return false;
    } else {
      return true;
    }
  },
  OPERATE_COMPILE(input, compiler) {
    compiler.compile(input.symbol, input);
    return false;
  },
};

// TODO: ruler 取代translater
export class Ruler {
  rules: Rule[] = [];

  compiler!: Compiler;

  private pointer: number | null = null;

  constructor(rules?: Rule[]) {
    if (rules) {
      this.rules = rules;
    } else {
      this.rules.push(
        DEFAULT_RULE.SYMBOL_VALIDATOR,
        DEFAULT_RULE.OPERATE_ADD,
        DEFAULT_RULE.OPERATE_DELETE,
        DEFAULT_RULE.OPERATE_COVER,
        DEFAULT_RULE.OPERATE_COMPILE
      );
    }
  }

  link(compiler: Compiler<any>) {
    this.compiler = compiler;
  }

  execute(input: CtnNotice) {
    for (const rule of this.rules) {
      if (!rule(input, this.compiler)) {
        break;
      }
    }
  }

  remove(rule: Rule) {
    if (this.rules.includes(rule)) {
      const index = this.rules.indexOf(rule);
      this.rules.splice(index, 1);
    } else {
      console.warn(`Ruler: can not found rule`, rule, this.rules);
    }
  }

  add(rule: Rule, index?: number): this {
    if (this.rules.includes(rule)) {
      console.warn(`Ruler: rules has already exist this rule`, this.rules);
      return this;
    }

    if (index !== undefined) {
      this.rules.splice(index, 0, rule);
      return this;
    }

    if (this.pointer === null) {
      console.error(
        `Ruler:index is undefined, need a index or use before and after api to set a index`
      );
      return this;
    }

    this.rules.splice(this.pointer, 0, rule);
    return this;
  }

  before(rule: Rule): this {
    if (!this.rules.includes(rule)) {
      console.warn(`Ruler: rules not found this rule`, this.rules);
      return this;
    }

    this.pointer = this.rules.indexOf(rule);
    return this;
  }

  after(rule: Rule) {
    if (!this.rules.includes(rule)) {
      console.warn(`Ruler: rules not found this rule`, this.rules);
      return this;
    }

    this.pointer = this.rules.indexOf(rule) + 1;
    return this;
  }

  push(rule: Rule): this {
    if (this.rules.includes(rule)) {
      console.warn(`Ruler: rules has already exist this rule`, this.rules);
      return this;
    }

    this.rules.push(rule);
    return this;
  }

  unshift(rule: Rule): this {
    if (this.rules.includes(rule)) {
      console.warn(`Ruler: rules has already exist this rule`, this.rules);
      return this;
    }

    this.rules.unshift(rule);
    return this;
  }

  pop(): this {
    this.rules.pop();
    return this;
  }

  shift(): this {
    this.rules.shift();
    return this;
  }
}

export const defineRule = function (rules: Rule[]) {
  return rules;
};
