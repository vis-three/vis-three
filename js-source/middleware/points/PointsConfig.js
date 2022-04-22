import { CONFIGTYPE } from "../constants/configType";
import { getSolidObjectConfig, } from "../solidObject/SolidObjectConfig";
export const getPointsConfig = function () {
    return Object.assign(getSolidObjectConfig(), {
        type: CONFIGTYPE.POINTS,
        geometry: "",
        material: "",
    });
};
//# sourceMappingURL=PointsConfig.js.map