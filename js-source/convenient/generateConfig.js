import { getConfigFunctionMap } from "../utils/utils";
const typeMap = getConfigFunctionMap();
export const generateConfig = function (type, merge, warn) {
    if (typeMap[type]) {
        const recursion = (config, merge) => {
            for (const key in merge) {
                if (config[key] === undefined) {
                    warn && console.warn(`'${type}' config can not set key: ${key}`);
                    continue;
                }
                if (typeof merge[key] === 'object' && merge[key] !== null && !Array.isArray(merge[key])) {
                    recursion(config[key], merge[key]);
                }
                else {
                    config[key] = merge[key];
                }
            }
        };
        const initConfig = typeMap[type]();
        merge && recursion(initConfig, merge);
        return initConfig;
    }
    else {
        console.error(`type: ${type} can not be found in configList.`);
        return null;
    }
};
//# sourceMappingURL=generateConfig.js.map