import { validate } from "uuid";
import { Rule } from "../../core/Rule";
import { CONFIGTYPE } from "../constants/configType";
export const RendererRule = function (input, compiler) {
    Rule(input, compiler, (vid) => {
        return (validate(vid) ||
            [CONFIGTYPE.WEBGLRENDERER, CONFIGTYPE.CSS3DRENDERER].includes(vid));
    });
};
//# sourceMappingURL=RendererRule.js.map