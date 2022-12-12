import { DeepPartial, DeepRecord, DeepUnion } from "./declare";

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

export type IgnoreAttribute<O extends object> = DeepUnion<
  DeepPartial<DeepRecord<O, boolean>>,
  boolean
>;

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
  filter?: IgnoreAttribute<C>,
  callBack?: Function
) {
  const recursiveConfig = (
    config: object,
    target: object,
    filter?: IgnoreAttribute<C>
  ) => {
    for (const key in config) {
      if (target[key] === undefined) {
        continue;
      }

      if (filter && filter[key]) {
        continue;
      }

      if (typeof config[key] === "object" && typeof config[key] !== null) {
        if (
          filter &&
          typeof filter[key] === "object" &&
          typeof filter[key] !== null
        ) {
          recursiveConfig(config[key], target[key], filter[key]);
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

export const isObject = function (object: any) {
  return typeof object === "object" && object !== null;
};

export const isArray = function (object: any) {
  return typeof object === "object" && object !== null && Array.isArray(object);
};

export const extendPath = function (str1: string, str2: string) {
  return str1 && str2 ? `${str1}.${str2}` : str1 || str2;
};

export const transPkgName = function (str: string) {
  let name = str.split("/").pop();
  if (!name) {
    return str;
  }

  return name.split("-").reduce((str, elem) => {
    return (str += elem[0].toUpperCase() + elem.slice(1));
  }, "");
};
