import { Subject } from "rxjs";
import {
  cacheArray,
  extendPath,
  getCacheArray,
  isArray,
  isObject,
} from "../utils/utils";

export interface ReactNotice {
  operate: "get" | "add" | "set" | "delete";
  path: string;
  key: string;
  value: any;
}

export interface Ignore {
  [key: string]: Ignore | boolean;
}

const proxyWeak = new WeakMap<object, Observable<object>>();

const proxyGetter = function (
  target: any,
  key: string | symbol,
  receiver: any,
  observable: Observable<object>,
  path: string
) {
  const result = Reflect.get(target, key, receiver);

  if (typeof key !== "symbol" && !observable.isIgnore(path)) {
    path = extendPath(path, key);

    observable.next({
      operate: "get",
      path,
      key,
      value: target[key],
    });
  }

  return result;
};

const proxySetter = function (
  target: any,
  key: string | symbol,
  value: any,
  receiver: any,
  observable: Observable<object>,
  path: string
): boolean {
  // 剔除symbol
  if (typeof key === "symbol" || observable.isIgnore(path)) {
    return Reflect.set(target, key, value, receiver);
  }

  path = extendPath(path, key);

  if (isObject(value) && !proxyWeak.has(value)) {
    value = react(observable, value, path);
  }

  // 新增
  if (target[key] === undefined) {
    // 对array value 执行缓存
    isArray(value) && cacheArray(value);

    const result = Reflect.set(target, key, value);

    observable.next({
      operate: "add",
      path,
      key,
      value,
    });

    return result;
  }

  const result = Reflect.set(target, key, value);

  // array的length变更需要重新比对数组，找出真正的操作对象，并且更新缓存
  if (isArray(target) && key === "length") {
    const oldValue = getCacheArray(target);

    if (!oldValue) {
      console.error("array value is not be cached:", target);
      return result;
    }

    // 只用还原length减少的现场
    const num = oldValue.length - target.length;
    if (num > 0) {
      let execNum = 0;
      let index = 0;
      path = path.slice(0, -key.length);
      for (const del of oldValue) {
        if (!target.includes(del)) {
          observable.next({
            operate: "delete",
            path: path + index,
            key: index.toString(),
            value: del,
          });

          execNum += 1;
          index += 1;

          if (execNum === num) {
            break;
          }
        }
      }
    }
    cacheArray(target);
    return result;
  }

  observable.next({
    operate: "set",
    path,
    key,
    value,
  });

  return result;
};

const proxyDeleter = function (
  target: any,
  key: string | symbol,
  observable: Observable<object>,
  path: string
): boolean {
  if (typeof key === "symbol" || observable.isIgnore(path)) {
    return Reflect.deleteProperty(target, key);
  }

  path = extendPath(path, key);
  const value = target[key];
  const result = Reflect.deleteProperty(target, key);

  // array的delete不可信
  if (isArray(target)) {
    return result;
  }

  observable.next({
    operate: "delete",
    path,
    key,
    value,
  });

  return result;
};

const react = function (
  observable: Observable<object>,
  object: object,
  path = ""
): object {
  if (typeof object !== "object") {
    return object;
  }

  if (proxyWeak.has(object)) {
    return object;
  }

  if (observable.isIgnore(path)) {
    return object;
  }

  const handler = {
    get: (target, key: string | symbol, receiver: any) =>
      proxyGetter(target, key, receiver, observable, path),
    set: (target: any, key: string | symbol, value: any, receiver: any) =>
      proxySetter(target, key, value, receiver, observable, path),
    deleteProperty: (target: any, key: string | symbol) =>
      proxyDeleter(target, key, observable, path),
  };

  // 递归整个对象进行代理拓展
  if (isObject(object)) {
    for (const key in object) {
      // 判断是否需要忽略
      const tempPath = extendPath(path, key);

      if (observable.isIgnore(tempPath)) {
        continue;
      }

      if (isObject(object[key])) {
        // 给array增加symbol与缓存
        isArray(object[key]) && cacheArray(object[key]);

        object[key] = react(observable, object[key], tempPath);
      }
    }
  }

  const proxy = new Proxy(object, handler);

  proxyWeak.set(proxy, observable);

  return proxy;
};

export class Observable<T extends object> extends Subject<ReactNotice> {
  private ignore: Ignore = {};
  raw: T;

  constructor(object: T, ignore?: Ignore) {
    super();
    this.raw = object;
    ignore && (this.ignore = ignore);
  }

  isIgnore(path: string): boolean {
    let ignore = this.ignore;
    for (const key of path.split(".")) {
      if (ignore[key] === undefined) {
        return false;
      }

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
}

export const observable = function <T extends object>(
  object: T,
  ignore?: Ignore
) {
  const observable = new Observable(object, ignore);
  return react(observable, object) as T;
};

export const getObservable = function <T extends object>(object: T) {
  return proxyWeak.get(object) as Observable<T>;
};
