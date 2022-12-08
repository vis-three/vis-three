import { Subject } from "rxjs";
export interface ReactNotice {
    operate: "get" | "add" | "set" | "delete";
    path: string;
    key: string;
    value: any;
}
export interface Ignore {
    [key: string]: Ignore | boolean;
}
export declare class Observable<T extends object> extends Subject<ReactNotice> {
    private ignore;
    raw: T;
    constructor(object: T, ignore?: Ignore);
    isIgnore(path: string): boolean;
    setIgnore(ignore: Ignore): void;
    mergeIgnore(ignore: Ignore): void;
}
export declare const observable: <T extends object>(object: T, ignore?: Ignore) => T;
export declare const getObservable: <T extends object>(object: T) => Observable<T>;
