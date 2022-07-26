import { validate } from "uuid";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
export const SceneRule = function (input, compiler) {
    Rule(input, compiler, (vid) => {
        return validate(vid) || [CONFIGTYPE.SCENE].includes(vid);
    });
};
//# sourceMappingURL=SceneRule.js.map