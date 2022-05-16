import { CONFIGTYPE } from "../constants/configType";
import { getSolidObjectConfig, } from "../solidObject/SolidObjectConfig";
export const getLineConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        type: CONFIGTYPE.LINE,
        geometry: "",
        material: "",
    });
};
//# sourceMappingURL=LineConfig.js.map