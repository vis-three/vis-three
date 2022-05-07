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
  static proxyWeakSet = new WeakSet();

  private ignoreAttribute: IgnoreAttribute;
  private arraySymobl = "vis.array";

  constructor(ignore?: IgnoreAttribute) {
    super();

    this.ignoreAttribute = ignore || {};
  }

  // 代理拓展
  proxyExtends<T extends object>(object: T, path?: Array<string>): T {
    if (!path) {
      path = [];
    }

    if (ProxyBroadcast.proxyWeakSet.has(object) || typeof object !== "object") {
      return object;
    }

    const handler: ProxyHandler<object> = {
      get: (target: object, key: any) => {
        return Reflect.get(target, key);
      },

      set: (target: object, key: any, value: any) => {
        // 剔除symbol
        if (typeof key === "symbol") {
          return Reflect.set(target, key, value);
        }

        // 先执行反射
        let result: boolean;

        // 新增
        if (target[key as never] === undefined) {
          // 如果是对象就递归
          if (
            typeof value === "object" &&
            value !== null &&
            !ProxyBroadcast.proxyWeakSet.has(value)
          ) {
            const newPath = path!.concat([key]);
            value = this.proxyExtends(value, newPath);
          }

          result = Reflect.set(target, key, value);

          this.broadcast({
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
            !ProxyBroadcast.proxyWeakSet.has(value)
          ) {
            const newPath = path!.concat([key]);
            value = this.proxyExtends(value, newPath);
          }

          result = Reflect.set(target, key, value);

          // array的length变更需要重新比对数组，找出真正的操作对象，并且更新缓存
          if (Array.isArray(target) && key === "length") {
            const oldValue = target[Symbol.for(this.arraySymobl)];

            // 只用还原length减少的现场
            const num = oldValue.length - target.length;
            if (num > 0) {
              let execNum = 0;
              let index = 0;
              for (const value of oldValue) {
                if (!target.includes(value)) {
                  this.broadcast({
                    operate: "delete",
                    path: path!.concat([]),
                    key: index.toString(),
                    value: value,
                  });

                  execNum += 1;
                  index += 1;
                  if (execNum === num) {
                    break;
                  }
                }
              }
            }
            target[Symbol.for(this.arraySymobl)] = target.concat([]);
            return result;
          }

          this.broadcast({
            operate: "set",
            path: path!.concat([]),
            key,
            value: value,
          });
        }

        return result;
      },

      deleteProperty: (target: object, key: any) => {
        const value = target[key];
        // 先执行反射
        const result = Reflect.deleteProperty(target, key);

        // array的delete是不可信的，需要从length判断
        if (Array.isArray(target)) {
          return result;
        }

        this.broadcast({
          operate: "delete",
          path: path!.concat([]),
          key,
          value,
        });
        return result;
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
          if (Array.isArray(object[key])) {
            // 引用值保持为引用
            object[key][Symbol.for(this.arraySymobl)] = (
              object[key] as Array<any>
            ).concat([]) as never;
          }
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
