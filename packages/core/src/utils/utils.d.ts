export type DeepPartial<T> = T extends Function ? T : T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
export type DeepRecord<T, K> = T extends Function ? K : T extends object ? {
    [P in keyof T]: DeepRecord<T[P], K>;
} : K;
export type DeepUnion<T, K> = T extends Function ? T : T extends object ? {
    [P in keyof T]: DeepUnion<T[P], K> | K;
} : T;
export type DeepIntersection<T, I> = T extends Function ? T : T extends object ? {
    [P in keyof T]: DeepIntersection<T[P], I>;
} & I : T;
export type ArrayToObject<A extends Array<any>> = {
    [P in keyof A]: A[P];
};
export type DeepArrayToObject<T> = T extends Function ? T : T extends object ? {
    [P in keyof T]: DeepArrayToObject<T[P]>;
} : T extends Array<any> ? ArrayToObject<T> : T;
export type IgnoreAttribute<O extends object> = DeepUnion<DeepPartial<DeepRecord<O, boolean>>, boolean>;
export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
export declare function isValidEnum(enumeration: object, value: string | number): boolean;
export declare function generateConfigFunction<T extends object>(config: T): (merge: T) => T;
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
export declare const extendPath: (path: string, key: string) => string;
export declare const cacheArray: (object: Array<any>) => void;
export declare const getCacheArray: (object: Array<any>) => any[] | undefined;
export declare class Pipeline {
    config: any;
    constructor(config: any);
    pipe(fun: (config: any) => any): this;
    get(): any;
}
