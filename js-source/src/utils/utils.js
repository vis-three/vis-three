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
//# sourceMappingURL=utils.js.map