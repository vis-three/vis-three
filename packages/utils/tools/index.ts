import { DeepPartial, DeepRecord, DeepUnion } from "../declare";

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

export const typeOf = function (object: any) {
  if (typeof object === "object") {
    if (object === null) {
      return "null";
    }
    if (Array.isArray(object)) {
      return "array";
    }

    if (object instanceof String) {
      return "String";
    }

    if (object instanceof Number) {
      return "Number";
    }

    if (object instanceof Boolean) {
      return "Boolean";
    }

    return "object";
  } else {
    return typeof object;
  }
};

export const extendPath = function (str1: string, str2: string) {
  return str1 && str2 ? `${str1}.${str2}` : str1 || str2;
};

export const transPkgName = function (str: string) {
  let name = str.split("/").pop();
  if (!name) {
    return str;
  }

  const nameList = name.split("-");

  nameList.push(nameList[0]);

  nameList.shift();

  return nameList.reduce((str, elem) => {
    return (str += elem[0].toUpperCase() + elem.slice(1));
  }, "");
};

export const getFinalReference = function (
  object: Record<string, any>,
  attr: string
) {
  if (attr === "") {
    console.error(`attr can not be empty`);
    return null;
  }

  const list = attr.split(".");
  let reference = object;

  for (const key of list.slice(0, -1)) {
    if (typeof reference[key] === "undefined") {
      console.error(`object has not this attr: ${attr}`, object);
      return null;
    } else {
      reference = reference[key];
    }
  }

  return {
    reference,
    key: list.pop()!,
  };
};

export const objectDeepMerge = function (
  target: any,
  merge: any,
  option: { cover?: boolean; fresh?: boolean } = { cover: false, fresh: true }
) {
  if (!isObject(target)) {
    target = {};
  }

  if (!isObject(merge)) {
    console.warn(`merge is not a object: ${merge}`);
    return target;
  }

  const recursiveObject = (obj1: object, obj2: object) => {
    for (const key in obj2) {
      if (Array.isArray(obj2[key])) {
        if (!obj1[key]) {
          obj1[key] = (<any>[]).concat(obj2[key]);
        } else if (!Array.isArray(obj1[key])) {
          console.error(`can not merge this key in object: ${key}`, obj1, obj2);
          return;
        } else {
          obj1[key] = Array.from(
            new Set((<any>[]).concat(obj1[key], obj2[key]))
          );
        }
      } else if (isObject(obj2[key])) {
        if (!obj1[key]) {
          obj1[key] = {};
          recursiveObject(obj1[key], obj2[key]);
        } else if (!isObject(obj1[key])) {
          console.error(`can not merge this key in object: ${key}`, obj1, obj2);
        } else {
          recursiveObject(obj1[key], obj2[key]);
        }
      } else {
        if (!obj1[key]) {
          obj1[key] = obj2[key];
        } else {
          if (option.cover) {
            obj1[key] = obj2[key];
          }
        }
      }
    }
  };

  if (option.fresh) {
    const fresh = {};
    recursiveObject(fresh, target);
    recursiveObject(fresh, merge);
    return fresh;
  } else {
    recursiveObject(target, merge);
    return target;
  }
};
