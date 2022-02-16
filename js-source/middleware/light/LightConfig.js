import { getObjectConfig } from "../object/ObjectConfig";
export const getLightConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Light',
        color: 'rgb(255, 255, 255)',
        intensity: 1
    });
};
export const getAmbientLightConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'AmbientLight',
        color: 'rgb(255, 255, 255)',
        intensity: 1
    });
};
export const getPointLightConfig = function () {
    return Object.assign(getLightConfig(), {
        type: 'PointLight',
        distance: 30,
        decay: 0.01
    });
};
export const getSpotLightConfig = function () {
    return Object.assign(getLightConfig(), {
        type: 'SpotLight',
        distance: 30,
        angle: Math.PI / 180 * 45,
        penumbra: 0.01,
        decay: 0.01
    });
};
//# sourceMappingURL=LightConfig.js.map