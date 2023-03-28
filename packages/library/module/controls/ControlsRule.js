import { validate } from "uuid";
import { Rule } from "@vis-three/middleware";
export const validSymbols = [];
export const ControlsRule = function (input, compiler) {
    Rule(input, compiler, (vid) => {
        return validate(vid) || validSymbols.includes(vid);
    });
};
