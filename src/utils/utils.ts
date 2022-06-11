export function isValidKey(
  key: string | number | symbol,
  object: object
): key is keyof typeof object {
  return key in object;
}

export function isValidEnum(
  enumeration: object,
  value: string | number
): boolean {
  return Object.values(enumeration).includes(value);
}

export function generateConfigFunction<T extends object>(config: T) {
  return (merge: T): T => {
    const recursion = (config: object, merge: object) => {
      for (const key in merge) {
        if (config[key] === undefined) {
          console.warn(` config can not set key: ${key}`);
          continue;
        }
        if (
          typeof merge[key] === "object" &&
          merge[key] !== null &&
          !Array.isArray(merge[key])
        ) {
          recursion(config[key], merge[key]);
        } else {
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

export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;
