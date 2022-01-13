import { getObjectConfig } from "../object/ObjectConfig";
export const getModelConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Mesh',
        geometry: '',
        material: ''
    });
};
export const getMeshConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Mesh',
        geometry: '',
        material: ''
    });
};
export const getLineConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Line',
        geometry: '',
        material: ''
    });
};
export const getPointsConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Points',
        geometry: '',
        material: ''
    });
};
//# sourceMappingURL=ModelConfig.js.map