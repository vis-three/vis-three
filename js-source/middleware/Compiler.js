import { isValidKey } from "../utils/utils";
export class Compiler {
    static applyConfig(config, object, callBack) {
        const recursiveConfig = (config, object) => {
            for (const key in config) {
                if (typeof config[key] === 'object' && typeof config[key] !== null && isValidKey(key, object)) {
                    recursiveConfig(config[key], object[key]);
                }
                if (isValidKey(key, object)) {
                    object[key] = config[key];
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