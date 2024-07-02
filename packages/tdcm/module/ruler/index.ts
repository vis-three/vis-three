import { globalOption } from "../../option";
import { Compiler } from "../compiler";
import { CtnNotice } from "../container";

export type Rule = (input: CtnNotice, compiler: Compiler) => boolean;

export interface RuleInfo {
  rule: Rule;
  index: number;
}

export enum DEFAULT_RULE {
  SYMBOL_VALIDATOR = "symbolValidator",
  OPERATE_ADD = "operateAdd",
  OPERATE_DELETE = "operateDelete",
  OPERATE_COVER = "operateCover",
  OPERATE_COMPILE = "operateCompile",
}

export enum DEFAULT_RULE_INDEX {
  SYMBOL_VALIDATOR = 0,
  OPERATE_ADD = 100,
  OPERATE_DELETE = 200,
  OPERATE_COVER = 300,
  OPERATE_COMPILE = 300,
}

export class Ruler {
  chain: Rule[] = [];
  rule: Record<string, RuleInfo> = {
    [DEFAULT_RULE.SYMBOL_VALIDATOR]: {
      rule(input) {
        return !globalOption.symbol.validator(input.symbol);
      },
      index: DEFAULT_RULE_INDEX.SYMBOL_VALIDATOR,
    },
    [DEFAULT_RULE.OPERATE_ADD]: {
      rule({ operate, path, symbol, key, value }, compiler) {
        if (operate === "add" && !path.length && symbol === key) {
          compiler.add(value);
          return false;
        } else {
          return true;
        }
      },
      index: DEFAULT_RULE_INDEX.OPERATE_ADD,
    },
    [DEFAULT_RULE.OPERATE_DELETE]: {
      rule({ operate, path, value }, compiler) {
        if (operate === "delete" && !path.length) {
          compiler.remove(value);
          return false;
        } else {
          return true;
        }
      },
      index: DEFAULT_RULE_INDEX.OPERATE_DELETE,
    },
    [DEFAULT_RULE.OPERATE_COVER]: {
      rule({ operate, path, value, key, symbol }, compiler) {
        if (operate === "set" && !path.length && key === symbol) {
          compiler.cover(value);
          return false;
        } else {
          return true;
        }
      },
      index: DEFAULT_RULE_INDEX.OPERATE_COVER,
    },
    [DEFAULT_RULE.OPERATE_COMPILE]: {
      rule(input, compiler) {
        compiler.compile(input.symbol, input);
        return false;
      },
      index: DEFAULT_RULE_INDEX.OPERATE_COMPILE,
    },
  };
  compiler!: Compiler;

  constructor() {
    this.sort();
  }

  link(compiler: Compiler) {
    this.compiler = compiler;
  }

  sort() {
    this.chain = Object.values(this.rule)
      .sort((a, b) => a.index - b.index)
      .map((item) => item.rule);
  }

  execute(input: CtnNotice) {
    for (const rule of this.chain) {
      if (!rule(input, this.compiler)) {
        break;
      }
    }
  }
}
