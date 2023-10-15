import { Ignore } from "./Observer";
import { getObserver } from "../../utils/utils";
/**
 * 将传入的数据进行代理并创建数据的观察者
 * @internal
 * @param object
 * @param ignore
 * @returns
 */
export declare const observable: <T extends object>(object: T, ignore?: Ignore) => T;
export { getObserver };
