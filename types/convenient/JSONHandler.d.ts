export declare const stringify: (key: any, value: any) => any;
export declare const parse: (key: any, value: any) => any;
/**
 * 深度克隆对象
 * @param object 配置对象
 * @returns deep clone object
 */
export declare const clone: <T extends object>(object: T) => T;
