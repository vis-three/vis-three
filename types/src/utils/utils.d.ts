export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
export declare function isValidEnum(enumeration: object, value: string | number): boolean;
export declare function generateConfigFunction<T extends object>(config: T): (merge: T) => T;
export declare type DeepPartial<T> = T extends Function ? T : T extends object ? {
    [P in keyof T]?: DeepPartial<T[P]>;
} : T;
