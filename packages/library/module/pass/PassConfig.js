export const getPassConfig = function () {
    return {
        vid: "",
        type: "Pass",
        index: 0, // TODO: 顺序
    };
};
export const getSMAAPassConfig = function () {
    return Object.assign(getPassConfig(), {});
};
export const getUnrealBloomPassConfig = function () {
    return Object.assign(getPassConfig(), {
        strength: 1.5,
        threshold: 0,
        radius: 0,
    });
};
export const getSelectiveBloomPassConfig = function () {
    return Object.assign(getPassConfig(), {
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
