import { Observer } from "../module/observer/Observer";
import { Model } from "../module/model";
export declare const SYMBOL_FATHER = "vis.father";
export declare const SYMBOL_KEY = "vis.key";
export declare const SYMBOL_OB = "vis.observer";
export declare const SYMBOL_MODEL = "vis.model";
export declare const cacheArray: (object: Array<any>) => void;
export declare const getCacheArray: (object: Array<any>) => any[] | undefined;
export declare const getPath: (object: {
    Symbol: string;
}) => string;
export declare const updateArraySymbol: (array: Array<any>) => void;
export declare const getObserver: <T extends object>(object: T) => Observer<T> | undefined;
export declare const hasObserver: <T extends object>(object: T) => boolean;
export declare const getModel: <T extends object>(object: T) => Model | undefined;
