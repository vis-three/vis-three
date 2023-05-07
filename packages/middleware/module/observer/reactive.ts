import { extendPath, isArray, isObject } from "@vis-three/utils";
import { Observer } from "./Observer";
import { proxyDeleter, proxyGetter, proxySetter, proxyWeak } from "./proxy";
import {
  SYMBOL_FATHER,
  SYMBOL_KEY,
  cacheArray,
  getPath,
} from "../../utils/utils";

export const react = function <T extends object>(
  observer: Observer<object>,
  object: T,
  father?: { Symbol: string }
): T {
  if (!isObject(object)) {
    return object;
  }

  if (proxyWeak.has(object)) {
    return object;
  }

  const path = father ? getPath(father) : "";

  if (observer.isIgnore(path)) {
    return object;
  }

  const handler = {
    get: proxyGetter,
    set: (target: any, key: string | symbol, value: any, receiver: any) =>
      proxySetter(target, key, value, receiver, observer),
    deleteProperty: (target: any, key: string | symbol) =>
      proxyDeleter(target, key, observer),
  };

  father && (object[Symbol.for(SYMBOL_FATHER)] = father);

  for (const key in object) {
    // 判断是否需要忽略
    const tempPath = extendPath(path, key);

    if (observer.isIgnore(tempPath)) {
      continue;
    }

    if (isObject(object[key])) {
      if (isArray(object[key])) {
        const rawArray = object[key] as Array<any>;

        object[key] = react(
          observer,
          object[key] as object,
          object as { Symbol: any }
        ) as any;

        // 给array增加symbol与缓存
        cacheArray(rawArray);
      } else {
        object[key] = react(
          observer,
          object[key] as object,
          object as { Symbol: any }
        ) as any;
      }

      object[key][Symbol.for(SYMBOL_KEY)] = key;
    }
  }

  const proxy = new Proxy(object, handler);

  observer.saveRaw(proxy, object);

  proxyWeak.set(proxy, observer);

  return proxy;
};
