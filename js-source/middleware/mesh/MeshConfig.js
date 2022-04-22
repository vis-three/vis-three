import { CONFIGTYPE } from "../constants/configType";
import { getSolidObjectConfig, } from "../solidObject/SolidObjectConfig";
export const getMeshConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        type: CONFIGTYPE.MESH,
        geometry: "",
        material: "",
    });
};
//# sourceMappingURL=MeshConfig.js.map