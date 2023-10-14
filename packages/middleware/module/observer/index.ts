import { globalOption } from "../../option";
import { Ignore, Observer, ReactNotice } from "./Observer";
import { proxyWeak } from "./proxy";

export { ReactNotice };

/**
 * 将传入的数据进行代理并创建数据的观察者
 * @internal
 * @param object
 * @param ignore
 * @returns
 */
export const observable = function <T extends object>(
  object: T,
  ignore?: Ignore
) {
  const observer = new Observer(object, ignore);
  return observer.target;
};

/**
 * 获取数据的观察者实例
 * @internal
 * @param object
 * @returns
 */
export const getObserver = function <T extends object>(object: T) {
  return proxyWeak.get(
    globalOption.proxy.toRaw ? globalOption.proxy.toRaw(object) : object
  ) as Observer<T>;
};
