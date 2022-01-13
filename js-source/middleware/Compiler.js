import { EventDispatcher } from "three";
import { isValidKey } from "../utils/utils";
export var COMPILEREVENTTYPE;
(function (COMPILEREVENTTYPE) {
    COMPILEREVENTTYPE["ADD"] = "add";
    COMPILEREVENTTYPE["REMOVE"] = "remove";
})(COMPILEREVENTTYPE || (COMPILEREVENTTYPE = {}));
export class Compiler extends EventDispatcher {
    static applyConfig(config, object, callBack) {
        const filterMap = {
            vid: true,
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
        super();
    }
}
//# sourceMappingURL=Compiler.js.map