import { DEFAULT_RULE, defineRule, globalOption } from "@vis-three/tdcm";

export const validSymbols: string[] = [];

export default defineRule([
  function (input) {
    return (
      globalOption.symbol.validator(input.symbol) ||
      validSymbols.includes(input.symbol)
    );
  },
  DEFAULT_RULE.OPERATE_ADD,
  DEFAULT_RULE.OPERATE_DELETE,
  DEFAULT_RULE.OPERATE_COVER,
  DEFAULT_RULE.OPERATE_COMPILE,
]);
