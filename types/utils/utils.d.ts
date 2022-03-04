export declare function isValidKey(key: string | number | symbol, object: object): key is keyof typeof object;
export declare function isValidEnum(enumeration: object, value: string | number): boolean;
export declare function generateConfigFunction<T extends object>(config: T): (merge: T) => T;
export declare function getConfigModelMap(): {
    [key: string]: string;
};
export declare function getConfigFunctionMap(): {
    [key: string]: Function;
};
