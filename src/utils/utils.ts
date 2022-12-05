export type DeepPartial<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]?: DeepPartial<T[P]> }
  : T;

export type DeepRecord<T, K> = T extends Function
  ? K
  : T extends object
  ? { [P in keyof T]: DeepRecord<T[P], K> }
  : K;

export type DeepUnion<T, K> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]: DeepUnion<T[P], K> | K }
  : T;

export type DeepIntersection<T, I> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]: DeepIntersection<T[P], I> } & I
  : T;

export type ArrayToObject<A extends Array<any>> = {
  [P in keyof A]: A[P];
};

export type DeepArrayToObject<T> = T extends Function
  ? T
  : T extends object
  ? { [P in keyof T]: DeepArrayToObject<T[P]> }
  : T extends Array<any>
  ? ArrayToObject<T>
  : T;

export type IgnoreAttribute<O extends object> = DeepUnion<
  DeepPartial<DeepRecord<O, boolean>>,
  boolean
>;

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

export const extendPath = function (path: string, key: string) {
  return path && key ? `${path}.${key}` : path || key;
};

const arrayCache = new WeakMap<Array<any>, Array<any>>();

export const cacheArray = function (object: Array<any>) {
  if (Array.isArray(object)) {
    arrayCache.set(object, object.concat([]));
  }
};

export const getCacheArray = function (object: Array<any>) {
  return arrayCache.get(object);
};

export class Pipeline {
  config: any;

  constructor(config: any) {
    this.config = config;
  }

  pipe(fun: (config: any) => any): this {
    this.config = fun(this.config);
    return this;
  }

  get() {
    return this.config;
  }
}
