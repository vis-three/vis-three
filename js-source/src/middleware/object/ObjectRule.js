import { Rule } from "../../core/Rule";
export const ObjectRule = function (input, compiler) {
    if (input.key === "parent") {
        return;
    }
    Rule(input, compiler);
};
//# sourceMappingURL=ObjectRule.js.map