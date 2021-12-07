import { isValidKey } from "../utils/utils";
export class Compiler {
    static applyConfig(config, object, callBack) {
        const filterMap = {
            type: true
        };
        const recursiveConfig = (config, object) => {
            for (const key in config) {
                if (typeof config[key] === 'object' && typeof config[key] !== null && isValidKey(key, object)) {
                    recursiveConfig(config[key], object[key]);
                }
                else {
                    if (isValidKey(key, object) && !filterMap[key]) {
                        object[key] = config[key];
                    }
                }
            }
        };
        recursiveConfig(config, object);
        callBack && callBack();
    }
    constructor() {
    }
}
//# sourceMappingURL=Compiler.js.map