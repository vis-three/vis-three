import { isArray, isObject } from "@vis-three/utils";
import { Observer } from "./Observer";
import { proxyDeleter, proxyGetter, proxySetter, proxyWeak } from "./proxy";
import { SYMBOL_FATHER, SYMBOL_KEY, SYMBOL_OB, cacheArray } from "./utils";

const handler = {
  get: proxyGetter,
  set: proxySetter,
  deleteProperty: proxyDeleter,
};

export const reactive = function <T extends object>(
  observer: Observer,
  object: T,
  father?: { Symbol: string }
): T {
  if (!isObject(object)) {
    return object;
  }

  if (proxyWeak.has(object)) {
    return object;
  }

  object[Symbol.for(SYMBOL_OB)] = observer;

  father && (object[Symbol.for(SYMBOL_FATHER)] = father);

  for (const key in object) {
    if (isObject(object[key])) {
      if (isArray(object[key])) {
        const rawArray = object[key] as Array<any>;

        object[key] = reactive(
          observer,
          object[key] as object,
          object as { Symbol: any }
        ) as any;

        // 给array增加symbol与缓存
        cacheArray(rawArray);
      } else {
        object[key] = reactive(
          observer,
          object[key] as object,
          object as { Symbol: any }
        ) as any;
      }

      object[key][Symbol.for(SYMBOL_KEY)] = key;
    }
  }

  const proxy = new Proxy(object, handler);

  proxyWeak.set(proxy, observer);

  return proxy;
};
