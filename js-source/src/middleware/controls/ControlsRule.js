import { validate } from "uuid";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
export const ControlsRule = function (input, compiler) {
    Rule(input, compiler, (vid) => {
        return (validate(vid) ||
            [CONFIGTYPE.TRNASFORMCONTROLS, CONFIGTYPE.ORBITCONTROLS].includes(vid));
    });
};
//# sourceMappingURL=ControlsRule.js.map