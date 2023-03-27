import { Rule } from "@vis-three/middleware";
import { validate } from "uuid";
export const validSymbols = [];
export const RendererRule = function (input, compiler) {
    Rule(input, compiler, (vid) => {
        return validate(vid) || validSymbols.includes(vid);
    });
};
