import { getSymbolConfig } from "@vis-three/middleware";
const getAnimationConfig = function () {
    return Object.assign(getSymbolConfig(), {
        name: "",
        target: "",
        attribute: "",
        play: true,
    });
};
export const getScriptAnimationConfig = function () {
    return Object.assign(getAnimationConfig(), {
        script: {
            name: "",
        },
    });
};
export const getKeyframeAnimationConfig = function () {
    return Object.assign(getAnimationConfig(), {
        script: {
            name: "",
        },
    });
};
