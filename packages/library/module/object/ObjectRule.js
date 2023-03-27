import { Rule } from "@vis-three/middleware";
import { validate } from "uuid";
export const ObjectRule = function (input, compiler, validateFun = validate) {
    if (input.key === "parent") {
        return;
    }
    Rule(input, compiler, validateFun);
};
