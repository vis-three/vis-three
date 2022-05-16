import { CONFIGTYPE } from "../constants/configType";
export const getScriptAnimationConfig = function () {
    return {
        vid: "",
        type: CONFIGTYPE.SCRIPTANIMATION,
        target: "",
        attribute: "",
        script: {
            name: "",
        },
    };
};
export const getKeyframeAnimationConfig = function () {
    return {
        vid: "",
        type: CONFIGTYPE.KEYFRAMEANIMATION,
        target: "",
        attribute: "",
    };
};
//# sourceMappingURL=AnimationConfig.js.map