import { BaseEvent, EventDispatcher } from "./EventDispatcher";
export interface ProxyNotice {
    operate: 'add' | 'set' | 'delete';
    path: Array<string>;
    key: string;
    value: any;
}
export interface ProxyEvent extends BaseEvent {
    notice: ProxyNotice;
}
export declare class ProxyBroadcast extends EventDispatcher {
    static proxyWeakSet: WeakSet<object>;
    constructor();
    proxyExtends<T extends object>(object: T, path?: Array<string>): T;
    broadcast({ operate, path, key, value }: ProxyNotice): this;
}
