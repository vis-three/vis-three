export function isValidKey(key, object) {
    return key in object;
}
export function isValidEnum(enumeration, value) {
    return Object.values(enumeration).includes(value);
}
export function generateConfigFunction(config) {
    return (merge) => {
        const recursion = (config, merge) => {
            for (const key in merge) {
                if (config[key] === undefined) {
                    console.warn(` config can not set key: ${key}`);
                    continue;
                }
                if (typeof merge[key] === "object" &&
                    merge[key] !== null &&
                    !Array.isArray(merge[key])) {
                    recursion(config[key], merge[key]);
                }
                else {
                    config[key] = merge[key];
                }
            }
        };
        if (merge) {
            recursion(config, merge);
        }
        return config;
    };
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
//# sourceMappingURL=utils.js.map