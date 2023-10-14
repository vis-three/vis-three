import { isObject } from "@vis-three/utils";

export const SYMBOL_FATHER = "vis.father";
export const SYMBOL_KEY = "vis.key";
export const SYMBOL_OB = "vis.widget.ob";
export const SYMBOL_WIDGET_EVENT = "vis.widget.event";
export const SYMBOL_WIDGET_WATCHER = "vis.widget.watcher";

const arrayCache = new WeakMap<Array<any>, Array<any>>();

export const cacheArray = function (object: Array<any>) {
  if (Array.isArray(object)) {
    arrayCache.set(object, object.concat([]));
  }
};

export const getCacheArray = function (object: Array<any>) {
  return arrayCache.get(object);
};

export const getPath = function (object: { Symbol: string }) {
  let path = "";

  const recursion = (object: { Symbol: string }) => {
    if (object[Symbol.for(SYMBOL_KEY)] !== undefined) {
      path = `${object[Symbol.for(SYMBOL_KEY)]}${path ? `.${path}` : ""}`;
      if (object[Symbol.for(SYMBOL_FATHER)]) {
        recursion(object[Symbol.for(SYMBOL_FATHER)]);
      }
    }
  };

  recursion(object);

  return path;
};

export const updateArraySymbol = function (array: Array<any>) {
  if (array.length && isObject(array[0])) {
    const length = array.length;
    for (let index = 0; index < length; index += 1) {
      array[index][Symbol.for(SYMBOL_KEY)] = index;
    }
  }
};
