import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
export const getLineConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: CONFIGTYPE.LINE,
        geometry: '',
        material: '',
    });
};
//# sourceMappingURL=LineConfig.js.map