import { getObserver } from "../../utils/obTool";
/**
 * 将传入的数据进行代理并创建数据的观察者
 * @internal
 * @param object
 * @returns
 */
export declare const observable: <T extends object>(object: T) => T;
export { getObserver };
export declare const slientSync: (config: any, fun: () => void) => void;
