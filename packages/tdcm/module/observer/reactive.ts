import { extendPath, isArray, isObject } from "@vis-three/utils";
import { Observer } from "./Observer";
import { proxyDeleter, proxyGetter, proxySetter } from "./proxy";
import {
  SYMBOL_FATHER,
  SYMBOL_KEY,
  SYMBOL_OB,
  cacheArray,
  getPath,
  hasObserver,
} from "../../utils/obTool";

const handler = {
  get: proxyGetter,
  set: proxySetter,
  deleteProperty: proxyDeleter,
};

export const react = function <T extends object>(
  observer: Observer<object>,
  object: T,
  father?: { Symbol: string },
  key?: string
): T {
  if (!isObject(object)) {
    return object;
  }

  if (hasObserver(object)) {
    return object;
  }

  const path = father ? getPath(father) : "";

  if (observer.ignore(path)) {
    return object;
  }

  father && (object[Symbol.for(SYMBOL_FATHER)] = father);
  object[Symbol.for(SYMBOL_OB)] = observer;

  for (const key in object) {
    // 判断是否需要忽略
    const tempPath = extendPath(path, key);

    if (observer.ignore(tempPath)) {
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

  if (key) {
    object[Symbol.for(SYMBOL_KEY)] = key;
  }

  const proxy = new Proxy(object, handler);

  return proxy;
};
