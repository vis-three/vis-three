import { getObject3DConfig } from "../common/ObjectConfig";
export const getLightConfig = function () {
    return Object.assign(getObject3DConfig(), {
        type: 'Light',
        color: 'rgb(255, 255, 255)',
        intensity: 1
    });
};
export const getPointLightConfig = function () {
    return Object.assign(getLightConfig(), {
        type: 'PointLight',
        distance: 100,
        decay: 0.1
    });
};
export const getSpotLightConfig = function () {
    return Object.assign(getLightConfig(), {
        type: 'SpotLight',
        distance: 150,
        angle: Math.PI / 180 * 45,
        penumbra: 0.01,
        decay: 0.01
    });
};
//# sourceMappingURL=LightConfig.js.map