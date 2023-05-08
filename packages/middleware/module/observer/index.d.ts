import { Ignore, Observer } from "./Observer";
export declare const observable: <T extends object>(object: T, ignore?: Ignore) => T;
export declare const getObserver: <T extends object>(object: T) => Observer<T>;
