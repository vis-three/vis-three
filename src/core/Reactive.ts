import { EventDispatcher } from "./EventDispatcher";

export interface ProxyNotice {
  operate: "get" | "add" | "set" | "delete";
  path: string;
  key: string;
  value: any;
}

export interface Ignore {
  [key: string]: Ignore | boolean;
}

const proxyWeak = new WeakSet<object>();
const rawMap = new WeakMap<object, object>();
const arrayCache = new WeakMap<Array<any>, Array<any>>();

const isObject = function (object: any) {
  return typeof object === "object" && object !== null;
};

const isArray = function (object: any) {
  return typeof object === "object" && object !== null && Array.isArray(object);
};

const extendPath = function (path: string, key: string) {
  return path ? `${path}.${key}` : key;
};

const broadcast = new EventDispatcher();

const cacheArray = function (object: Array<any>) {
  if (Array.isArray(object) && !arrayCache.has(object)) {
    arrayCache.set(object, object.concat([]));
  }
};

const getCacheArray = function (object: Array<any>) {
  return arrayCache.get(object);
};

const proxyGetter = function (
  target: any,
  key: string | symbol,
  receiver: any,
  reactive: Reactive<object>,
  path: string
) {
  const result = Reflect.get(target, key, receiver);
  broadcast.emit("add", {});
  return result;
};

const proxySetter = function (
  target: any,
  key: string | symbol,
  value: any,
  receiver: any,
  reactive: Reactive<object>,
  path: string
): boolean {
  // 剔除symbol
  if (typeof key === "symbol") {
    return Reflect.set(target, key, value, receiver);
  }

  path = extendPath(path, key);

  if (isObject(value)) {
    value = react(reactive, value, path);
  }
  // 先执行反射
  const result = Reflect.set(target, key, value);

  // 新增
  if (target[key] === undefined) {
    // 对array value 执行缓存
    isArray(value) && cacheArray(value);
    // 如果是对象就递归
    // broadcast.broadcast(target, {
    //   operate: "add",
    //   path: path!.concat([]),
    //   key,
    //   value,
    // });
    // 设置值
  } else {
    // array的length变更需要重新比对数组，找出真正的操作对象，并且更新缓存
    if (isArray(value) && key === "length") {
      const oldValue = getCacheArray(value);

      if (!oldValue) {
        console.error("array value is not be cached", value);
        return result;
      }

      // 只用还原length减少的现场
      const num = oldValue.length - target.length;
      if (num > 0) {
        let execNum = 0;
        let index = 0;
        for (const value of oldValue) {
          if (!target.includes(value)) {
            // broadcast.broadcast(target, {
            //   operate: "delete",
            //   path: path!.concat([]),
            //   key: index.toString(),
            //   value: value,
            // });

            execNum += 1;

            if (execNum === num) {
              break;
            }
          }
          index += 1;
        }
      }
      cacheArray(value);
    }

    // broadcast.broadcast(target, {
    //   operate: "set",
    //   path: path!.concat([]),
    //   key,
    //   value: value,
    // });
  }

  return result;
};

const proxyDeleter = function (
  target: any,
  key: string | symbol,
  reactive: Reactive<object>,
  path: string
): boolean {
  return Reflect.deleteProperty(target, key);
};

const react = function (
  reactive: Reactive<object>,
  object: object,
  path = ""
): object {
  if (typeof object !== "object") {
    return object;
  }

  if (reactive.isIgnore(path)) {
    return object;
  }

  const handler = {
    get: (target, key: string | symbol, receiver: any) =>
      proxyGetter(target, key, receiver, reactive, path),
    set: (target: any, key: string | symbol, value: any, receiver: any) =>
      proxySetter(target, key, value, receiver, reactive, path),
    deleteProperty: (target: any, key: string | symbol) =>
      proxyDeleter(target, key, reactive, path),
  };

  // 递归整个对象进行代理拓展
  if (isObject(object)) {
    for (const key in object) {
      // 判断是否需要忽略
      const tempPath = extendPath(path, key);

      if (reactive.isIgnore(tempPath)) {
        continue;
      }

      if (isObject(object[key])) {
        object[key] = react(reactive, object[key], tempPath);

        // 给array增加symbol与缓存
        isArray(object[key]) && cacheArray(object[key]);
      }
    }
  }

  const proxy = new Proxy(object, handler);

  proxyWeak.add(proxy);

  return proxy;
};

export class Reactive<T extends object> {
  private ignore: Ignore = {};
  private raw: T;

  constructor(object: T, ignore?: Ignore) {
    this.raw = object;
  }

  isIgnore(path: string): boolean {
    let ignore = this.ignore;
    for (const key of path.split(".")) {
      if (typeof ignore[key] === "boolean" && ignore[key]) {
        return true;
      } else {
        ignore = ignore[key] as Ignore;
      }
    }
    return false;
  }

  setIgnore(ignore: Ignore) {
    this.ignore = ignore;
  }

  mergeIgnore(ignore: Ignore) {
    this.ignore = Object.assign(this.ignore, ignore);
  }

  getRaw() {
    return this.raw;
  }

  observable() {
    // 代理完成之后的通知抛出
    return react(this, this.raw, "");
  }
}
