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
/**
 * 观察者类
 * @internal
 */
export declare class Observer<T extends object> extends Subject<ReactNotice> {
    private ignore;
    target: T;
    disable: boolean;
    constructor(object: T, ignore?: Ignore);
    isIgnore(path: string): boolean;
    setIgnore(ignore: Ignore): void;
    mergeIgnore(ignore: Ignore): void;
    next(value: ReactNotice): void;
}
