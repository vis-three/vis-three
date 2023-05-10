import { globalOption } from "../../option";
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
  return proxyWeak.get(
    globalOption.proxy.toRaw ? globalOption.proxy.toRaw(object) : object
  ) as Observer<T>;
};
