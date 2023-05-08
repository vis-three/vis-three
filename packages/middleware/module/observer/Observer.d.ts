import { Subject } from "rxjs";
export interface Ignore {
    [key: string]: Ignore | boolean;
}
export interface ReactNotice {
    operate: "add" | "set" | "delete";
    path: string;
    key: string;
    value: any;
}
export declare class Observer<T extends object> extends Subject<ReactNotice> {
    private ignore;
    target: T;
    private rawMap;
    constructor(object: T, ignore?: Ignore);
    isIgnore(path: string): boolean;
    setIgnore(ignore: Ignore): void;
    mergeIgnore(ignore: Ignore): void;
    saveRaw(proxy: object, target: object): void;
    toRaw<T extends object>(object: T): T | null;
}
