import { Ignore, Observer } from "./Observer";
import { proxyWeak } from "./proxy";

export const observable = function <T extends object>(
  object: T,
  ignore?: Ignore
) {
  const observer = new Observer(object, ignore);
  return observer.target;
};

export const getObserver = function <T extends object>(object: T) {
  return proxyWeak.get(object) as Observer<T>;
};
