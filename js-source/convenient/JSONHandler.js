export const stringify = (key, value) => {
    if (value === Infinity) {
        return "Infinity";
    }
    if (value === -Infinity) {
        return "-Infinity";
    }
    return value;
};
export const parse = (key, value) => {
    if (value === "Infinity") {
        return Infinity;
    }
    if (value === "-Infinity") {
        return -Infinity;
    }
    return value;
};
/**
 * 深度克隆对象
 * @param object 配置对象
 * @returns deep clone object
 */
export const clone = (object) => {
    return JSON.parse(JSON.stringify(object, stringify), parse);
};
//# sourceMappingURL=JSONHandler.js.map