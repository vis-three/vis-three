import { BaseEvent, EventDispatcher } from "./EventDispatcher";
import { isValidKey } from "../utils/utils";

export interface ProxyNotice {
  operate: "add" | "set" | "delete";
  path: Array<string>;
  key: string;
  value: any;
}

export interface ProxyEvent extends BaseEvent {
  notice: ProxyNotice;
}

export interface IgnoreAttribute {
  [key: string]: IgnoreAttribute | boolean;
}

export class ProxyBroadcast extends EventDispatcher {
  private static proxyWeakSet = new WeakSet();

  private static arraySymobl = "vis.array";

  private static cacheArray = function (object: any) {
    if (
      Array.isArray(object) &&
      !object[Symbol.for(ProxyBroadcast.arraySymobl)]
    ) {
      object[Symbol.for(ProxyBroadcast.arraySymobl)] = (
        object as Array<any>
      ).concat([]);
    }
  };

  private static proxyGetter(target: any, key: string | symbol, receiver: any) {
    return Reflect.get(target, key, receiver);
  }

  private static proxySetter(
    target: any,
    key: string | symbol,
    value: any,
    receiver: any,
    broadcast: ProxyBroadcast,
    path: string[]
  ): boolean {
    // 剔除symbol
    if (typeof key === "symbol") {
      return Reflect.set(target, key, value, receiver);
    }

    // 对array value 执行缓存
    ProxyBroadcast.cacheArray(value);

    // 先执行反射
    let result: boolean;

    // 新增
    if (target[key] === undefined) {
      // 如果是对象就递归
      if (
        typeof value === "object" &&
        value !== null &&
        !ProxyBroadcast.proxyWeakSet.has(value) &&
        !broadcast.ignoreAttribute[key]
      ) {
        const newPath = path!.concat([key]);
        value = broadcast.proxyExtends(value, newPath);
      }

      result = Reflect.set(target, key, value);

      broadcast.broadcast({
        operate: "add",
        path: path!.concat([]),
        key,
        value,
      });
      // 设置值
    } else {
      // 如果是对象就递归
      if (
        typeof value === "object" &&
        value !== null &&
        !ProxyBroadcast.proxyWeakSet.has(value) &&
        !broadcast.ignoreAttribute[key]
      ) {
        const newPath = path!.concat([key]);
        value = broadcast.proxyExtends(value, newPath);
      }

      result = Reflect.set(target, key, value);

      // array的length变更需要重新比对数组，找出真正的操作对象，并且更新缓存
      if (Array.isArray(target) && key === "length") {
        const oldValue = target[Symbol.for(ProxyBroadcast.arraySymobl)];

        // 只用还原length减少的现场
        const num = oldValue.length - target.length;
        if (num > 0) {
          let execNum = 0;
          let index = 0;
          for (const value of oldValue) {
            if (!target.includes(value)) {
              broadcast.broadcast({
                operate: "delete",
                path: path!.concat([]),
                key: index.toString(),
                value: value,
              });

              execNum += 1;

              if (execNum === num) {
                break;
              }
            }
            index += 1;
          }
        }
        target[Symbol.for(this.arraySymobl)] = target.concat([]);
        return result;
      }

      broadcast.broadcast({
        operate: "set",
        path: path!.concat([]),
        key,
        value: value,
      });
    }

    return result;
  }

  private static proxyDeleter(
    target: any,
    key: string | symbol,
    broadcast: ProxyBroadcast,
    path: string[]
  ): boolean {
    const value = target[key];
    // 先执行反射
    const result = Reflect.deleteProperty(target, key);

    // array的delete是不可信的，需要从length判断
    if (Array.isArray(target) || typeof key === "symbol") {
      return result;
    }

    broadcast.broadcast({
      operate: "delete",
      path: path!.concat([]),
      key,
      value,
    });

    return result;
  }

  private ignoreAttribute: IgnoreAttribute;

  constructor(ignore?: IgnoreAttribute) {
    super();

    this.ignoreAttribute = ignore || {};
  }

  // 代理拓展
  proxyExtends<T extends object>(object: T, path: Array<string> = []): T {
    if (ProxyBroadcast.proxyWeakSet.has(object) || typeof object !== "object") {
      return object;
    }

    const handler: ProxyHandler<object> = {
      get: ProxyBroadcast.proxyGetter,
      set: (
        target: object,
        key: string | symbol,
        value: any,
        receiver: any
      ) => {
        return ProxyBroadcast.proxySetter(
          target,
          key,
          value,
          receiver,
          this,
          path
        );
      },

      deleteProperty: (target: object, key: string | symbol) => {
        return ProxyBroadcast.proxyDeleter(target, key, this, path);
      },
    };

    // 递归整个对象进行代理拓展
    if (typeof object === "object" && object !== null) {
      for (const key in object) {
        const tempPath = path!.concat([key]);

        // 判断是否需要忽略 第一个为对象id所以忽略
        let ignoreAttribute = this.ignoreAttribute;
        let ignore = false;
        for (const tempKey of tempPath.slice(1)) {
          if (ignoreAttribute[tempKey] === true) {
            ignore = true;
            break;
          }
          ignoreAttribute[tempKey] &&
            (ignoreAttribute = ignoreAttribute[tempKey] as IgnoreAttribute);
        }

        if (ignore) {
          continue;
        }

        if (
          isValidKey(key, object) &&
          typeof object[key] === "object" &&
          object[key] !== null
        ) {
          // 给array增加symbol与缓存
          ProxyBroadcast.cacheArray(object[key]);
          object[key] = this.proxyExtends(object[key], tempPath) as never;
        }
      }
    }

    const proxy = new Proxy(object, handler) as T;

    ProxyBroadcast.proxyWeakSet.add(proxy);

    return proxy;
  }

  // 广播
  broadcast({ operate, path, key, value }: ProxyNotice): this {
    // 过滤
    const filterMap = {
      __poto__: true,
      length: true,
    };

    if (filterMap[key]) {
      return this;
    }

    this.dispatchEvent({
      type: "broadcast",
      notice: { operate, path, key, value },
    });

    return this;
  }
}
