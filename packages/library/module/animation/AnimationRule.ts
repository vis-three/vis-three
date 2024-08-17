import { DEFAULT_RULE, defineRule } from "@vis-three/tdcm";

export default defineRule([
  function (input) {
    if (input.key === "name" && input.path.length === 1) {
      return false;
    } else {
      return true;
    }
  },
  DEFAULT_RULE.SYMBOL_VALIDATOR,
  DEFAULT_RULE.OPERATE_ADD,
  DEFAULT_RULE.OPERATE_DELETE,
  DEFAULT_RULE.OPERATE_COVER,
  DEFAULT_RULE.OPERATE_COMPILE,
]);
