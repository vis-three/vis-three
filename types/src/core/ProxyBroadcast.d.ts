import { BaseEvent, EventDispatcher } from "./EventDispatcher";
export interface ProxyNotice {
    operate: "add" | "set" | "delete";
    path: Array<string>;
    key: string;
    value: any;
}
export interface ProxyEvent extends BaseEvent {
    notice: ProxyNotice;
}
export interface IgnoreAttribute {
    [key: string]: IgnoreAttribute | boolean;
}
export declare class ProxyBroadcast extends EventDispatcher {
    private static proxyWeakSet;
    private static arraySymobl;
    private static proxyGetter;
    private static proxySetter;
    private static proxyDeleter;
    private ignoreAttribute;
    constructor(ignore?: IgnoreAttribute);
    proxyExtends<T extends object>(object: T, path?: Array<string>): T;
    broadcast({ operate, path, key, value }: ProxyNotice): this;
}
