import { getObjectConfig } from "@vis-three/module-object";
const getLightConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: "Light",
        color: "rgb(255, 255, 255)",
        intensity: 1,
    });
};
export const getAmbientLightConfig = function () {
    return Object.assign(getObjectConfig(), {
        color: "rgb(255, 255, 255)",
        intensity: 1,
    });
};
export const getPointLightConfig = function () {
    return Object.assign(getLightConfig(), {
        distance: 30,
        decay: 0.01,
    });
};
export const getSpotLightConfig = function () {
    return Object.assign(getLightConfig(), {
        distance: 30,
        angle: (Math.PI / 180) * 45,
        penumbra: 0.01,
        decay: 0.01,
    });
};
export const getDirectionalLightConfig = function () {
    return Object.assign(getLightConfig(), {
        shadow: {
            mapSize: {
                width: 512,
                height: 512,
            },
            camera: {
                near: 0.5,
                far: 500,
            },
        },
    });
};
export const getHemisphereLightConfig = function () {
    return Object.assign(getLightConfig(), {
        color: "rgb(255, 255, 255)",
        groundColor: "rgb(0, 0, 0)",
    });
};
export const getRectAreaLightConfig = function () {
    return Object.assign(getLightConfig(), {
        width: 10,
        height: 10,
    });
};
