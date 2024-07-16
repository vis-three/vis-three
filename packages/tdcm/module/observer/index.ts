import { Observer } from "./Observer";
import { getObserver } from "../../utils/obTool";
/**
 * 将传入的数据进行代理并创建数据的观察者
 * @internal
 * @param object
 * @returns
 */
export const observable = function <T extends object>(object: T) {
  const observer = new Observer(object);
  return observer.target;
};

export { getObserver };

//TODO:希望自动收集所有静默配置
export const slientSync = function (config: any, fun: () => void) {
  const ob = getObserver(config);
  if (!ob) {
    console.warn(`this object can not found it observer:`, config);
    return;
  }

  ob.disable = true;

  fun();

  ob.disable = false;
};
