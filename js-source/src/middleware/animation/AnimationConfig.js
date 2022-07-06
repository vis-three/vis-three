import { CONFIGTYPE } from "../constants/configType";
const getAnimationConfig = function () {
    return {
        vid: "",
        type: "",
        target: "",
        attribute: "",
        play: true,
    };
};
export const getScriptAnimationConfig = function () {
    return Object.assign(getAnimationConfig(), {
        type: CONFIGTYPE.SCRIPTANIMATION,
        script: {
            name: "",
        },
    });
};
export const getKeyframeAnimationConfig = function () {
    return Object.assign(getAnimationConfig(), {
        type: CONFIGTYPE.KEYFRAMEANIMATION,
        script: {
            name: "",
        },
    });
};
//# sourceMappingURL=AnimationConfig.js.map