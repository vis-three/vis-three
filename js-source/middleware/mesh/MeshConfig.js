import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
export const getMeshConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: CONFIGTYPE.MESH,
        geometry: '',
        material: '',
    });
};
//# sourceMappingURL=MeshConfig.js.map