import { Ignore, Observer } from "./Observer";
import { getObserver } from "../../utils/utils";
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

export { getObserver };
