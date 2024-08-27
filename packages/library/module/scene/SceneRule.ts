import { ObjectRule } from "@vis-three/module-object";

import {
  DEFAULT_RULE,
  defineRule,
  globalOption,
  uniqueSymbol,
} from "@vis-three/tdcm";

const symbolList = [uniqueSymbol("Scene")];

export default defineRule([
  ObjectRule[0],
  function (input) {
    return (
      globalOption.symbol.validator(input.symbol) ||
      symbolList.includes(input.symbol)
    );
  },
  DEFAULT_RULE.OPERATE_ADD,
  DEFAULT_RULE.OPERATE_DELETE,
  DEFAULT_RULE.OPERATE_COVER,
  DEFAULT_RULE.OPERATE_COMPILE,
]);
