import { PASS_CONFIGTYPE } from "./constant";
export const getPassConfig = function () {
    return {
        vid: "",
        type: "Pass",
        index: 0, // TODO: 顺序
    };
};
export const getSMAAPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: PASS_CONFIGTYPE.SMAAPASS,
    });
};
export const getUnrealBloomPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: PASS_CONFIGTYPE.UNREALBLOOMPASS,
        strength: 1.5,
        threshold: 0,
        radius: 0,
    });
};
export const getSelectiveBloomPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: PASS_CONFIGTYPE.SELECTIVEBLOOMPASS,
        strength: 1,
        threshold: 0,
        radius: 0,
        renderScene: "",
        renderCamera: "",
        selectedObjects: [],
    });
};
export const getSSAOPassConfig = function () {
    return Object.assign(getPassConfig(), {
        type: PASS_CONFIGTYPE.SSAOPASS,
        camera: "",
        scene: "",
        kernelRadius: 8,
        kernelSize: 32,
        noiseTexture: "",
        output: 0,
        minDistance: 0.005,
        maxDistance: 0.1,
    });
};
