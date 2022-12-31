export function isValidKey(key, object) {
    return key in object;
}
export function isValidEnum(enumeration, value) {
    return Object.values(enumeration).includes(value);
}
/**
 * 同步对象
 * @param config 配置对象
 * @param target 目标对象
 * @param filter 过滤属性
 * @param callBack 回调
 */
export function syncObject(config, target, filter, callBack) {
    const recursiveConfig = (config, target, filter) => {
        for (const key in config) {
            if (target[key] === undefined) {
                continue;
            }
            if (filter && filter[key]) {
                continue;
            }
            if (typeof config[key] === "object" && typeof config[key] !== null) {
                if (filter &&
                    typeof filter[key] === "object" &&
                    typeof filter[key] !== null) {
                    recursiveConfig(config[key], target[key], filter[key]);
                }
                else {
                    recursiveConfig(config[key], target[key]);
                }
                continue;
            }
            target[key] = config[key];
        }
    };
    recursiveConfig(config, target, filter);
    callBack && callBack();
}
export const isObject = function (object) {
    return typeof object === "object" && object !== null;
};
export const isArray = function (object) {
    return typeof object === "object" && object !== null && Array.isArray(object);
};
export const extendPath = function (str1, str2) {
    return str1 && str2 ? `${str1}.${str2}` : str1 || str2;
};
export const transPkgName = function (str) {
    let name = str.split("/").pop();
    if (!name) {
        return str;
    }
    return name.split("-").reduce((str, elem) => {
        return (str += elem[0].toUpperCase() + elem.slice(1));
    }, "");
};
