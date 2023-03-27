import { uniqueSymbol } from "@vis-three/middleware";
import { ObjectRule } from "@vis-three/module-object";
import { validate } from "uuid";
const symbolList = [uniqueSymbol("Scene")];
export const SceneRule = function (input, compiler) {
    ObjectRule(input, compiler, (vid) => {
        return validate(vid) || symbolList.includes(vid);
    });
};
