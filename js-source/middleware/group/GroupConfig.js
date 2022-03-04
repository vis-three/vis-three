import { CONFIGTYPE } from "../constants/configType";
import { getObjectConfig } from "../object/ObjectConfig";
export const getGroupConfig = function () {
    return Object.assign(getObjectConfig(), {
        type: CONFIGTYPE.GROUP,
        children: []
    });
};
//# sourceMappingURL=GroupConfig.js.map