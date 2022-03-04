import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
const getLightConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Light',
        color: 'rgb(255, 255, 255)',
        intensity: 1
    });
};
export const getAmbientLightConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: CONFIGTYPE.AMBIENTLIGHT,
        color: 'rgb(255, 255, 255)',
        intensity: 1
    });
};
export const getPointLightConfig = function () {
    return Object.assign(getLightConfig(), {
        type: CONFIGTYPE.POINTLIGHT,
        distance: 30,
        decay: 0.01
    });
};
export const getSpotLightConfig = function () {
    return Object.assign(getLightConfig(), {
        type: CONFIGTYPE.SPOTLIGHT,
        distance: 30,
        angle: Math.PI / 180 * 45,
        penumbra: 0.01,
        decay: 0.01
    });
};
//# sourceMappingURL=LightConfig.js.map