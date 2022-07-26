import { CONFIGTYPE } from "../constants/configType";
export const getPassConfig = function () {
    return {
        vid: "",
        type: "Pass",
    };
};
export const getSMAAPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: CONFIGTYPE.SMAAPASS,
    });
};
export const getUnrealBloomPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: CONFIGTYPE.UNREALBLOOMPASS,
        resolution: {
            x: window.innerWidth,
            y: window.innerHeight,
        },
        strength: 1.5,
        threshold: 0,
        radius: 0,
    });
};
export const getSelectiveBloomPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: CONFIGTYPE.SELECTIVEBLOOMPASS,
        resolution: {
            x: window.innerWidth,
            y: window.innerHeight,
        },
        strength: 1,
        threshold: 0,
        radius: 0,
        renderScene: "",
        renderCamera: "",
        selectedObjects: [],
    });
};
//# sourceMappingURL=PassConfig.js.map