export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export interface IgnoreAttribute {
  [key: string]: IgnoreAttribute | boolean;
}

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

/**
 * 同步对象
 * @param config 配置对象
 * @param target 目标对象
 * @param filter 过滤属性
 * @param callBack 回调
 */
export function syncObject<C extends object, T extends object>(
  config: C,
  target: T,
  filter: IgnoreAttribute,
  callBack?: Function
) {
  const recursiveConfig = (
    config: object,
    target: object,
    filter?: IgnoreAttribute
  ) => {
    for (const key in config) {
      if (filter && filter[key]) {
        continue;
      }

      if (typeof config[key] === "object" && typeof config[key] !== null) {
        if (
          filter &&
          typeof filter[key] === "object" &&
          typeof filter[key] !== null
        ) {
          recursiveConfig(
            config[key],
            target[key],
            filter[key] as IgnoreAttribute
          );
        } else {
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