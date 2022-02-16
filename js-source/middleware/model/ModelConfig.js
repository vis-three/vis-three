import { getObjectConfig } from "../object/ObjectConfig";
export const getModelConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: 'Model',
        display: 'Mesh',
        geometry: '',
        material: ''
    });
};
//# sourceMappingURL=ModelConfig.js.map