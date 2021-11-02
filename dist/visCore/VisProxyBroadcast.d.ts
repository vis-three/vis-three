import { BaseEvent, EventDispatcher } from "three";
export interface VisProxyNotice {
    operate: 'add' | 'set' | 'delete';
    path: Array<string>;
    key: string;
    value: any;
}
export interface VisProxyEvent extends BaseEvent {
    notice: VisProxyNotice;
}
export declare class VisProxyBroadcast extends EventDispatcher<VisProxyEvent> {
    static proxyWeakSet: WeakSet<object>;
    constructor();
    proxyExtends<T extends object>(object: T, path?: Array<string>): T;
    broadcast({ operate, path, key, value }: VisProxyNotice): this;
}
//# sourceMappingURL=VisProxyBroadcast.d.ts.map