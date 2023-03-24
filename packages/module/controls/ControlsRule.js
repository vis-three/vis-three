import { validate } from "uuid";
import { CONFIGTYPE } from "../constants/configType";
import { uniqueSymbol } from "../common";
import { Rule } from "../module";
const symbols = [
    uniqueSymbol(CONFIGTYPE.TRNASFORMCONTROLS),
    uniqueSymbol(CONFIGTYPE.ORBITCONTROLS),
];
export const ControlsRule = function (input, compiler) {
    Rule(input, compiler, (vid) => {
        return validate(vid) || symbols.includes(vid);
    });
};
