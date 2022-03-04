import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
export const getPointsConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: CONFIGTYPE.POINTS,
        geometry: '',
        material: ''
    });
};
//# sourceMappingURL=PointsConfig.js.map