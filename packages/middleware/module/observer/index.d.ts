import { Ignore, Observer } from "./Observer";
/**
 * 将传入的数据进行代理并创建数据的观察者
 * @internal
 * @param object
 * @param ignore
 * @returns
 */
export declare const observable: <T extends object>(object: T, ignore?: Ignore) => T;
/**
 * 获取数据的观察者实例
 * @internal
 * @param object
 * @returns
 */
export declare const getObserver: <T extends object>(object: T) => Observer<T>;
