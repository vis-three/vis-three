import { DeepPartial, DeepRecord, DeepUnion } from "./declare";
export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
export declare function isValidEnum(enumeration: object, value: string | number): boolean;
export type IgnoreAttribute<O extends object> = DeepUnion<DeepPartial<DeepRecord<O, boolean>>, boolean>;
/**
 * 同步对象
 * @param config 配置对象
 * @param target 目标对象
 * @param filter 过滤属性
 * @param callBack 回调
 */
export declare function syncObject<C extends object, T extends object>(config: C, target: T, filter?: IgnoreAttribute<C>, callBack?: Function): void;
export declare const isObject: (object: any) => boolean;
export declare const isArray: (object: any) => boolean;
export declare const extendPath: (str1: string, str2: string) => string;
