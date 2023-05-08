import { Observer } from "./Observer";
export declare const proxyWeak: WeakMap<object, Observer<object>>;
export declare const proxyGetter: (target: any, key: string | symbol, receiver: any) => any;
export declare const proxySetter: (target: any, key: string | symbol, value: any, receiver: any, observer: Observer<object>) => boolean;
export declare const proxyDeleter: (target: any, key: string | symbol, observer: Observer<object>) => boolean;
