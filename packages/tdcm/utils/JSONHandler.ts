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
export const clone = <T extends object>(object: T): T => {
  return JSON.parse(JSON.stringify(object, stringify), parse);
};

export default {
  stringify,
  parse,
  clone,
};
