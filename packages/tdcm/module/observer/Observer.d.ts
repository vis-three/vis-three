import { Subject } from "rxjs";
export interface ObNotice {
    operate: "add" | "set" | "delete";
    path: string;
    key: string;
    value: any;
}
/**
 * 观察者类
 * @internal
 */
export declare class Observer<T extends object> extends Subject<ObNotice> {
    static IGNORE: {
        vid: boolean;
        type: boolean;
        alias: boolean;
        meta: boolean;
    };
    target: T;
    disable: boolean;
    constructor(object: T);
    ignore(path: string): boolean;
    next(value: ObNotice): void;
}
