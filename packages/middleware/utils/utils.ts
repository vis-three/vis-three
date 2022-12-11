const arrayCache = new WeakMap<Array<any>, Array<any>>();

export const cacheArray = function (object: Array<any>) {
  if (Array.isArray(object)) {
    arrayCache.set(object, object.concat([]));
  }
};

export const getCacheArray = function (object: Array<any>) {
  return arrayCache.get(object);
};
