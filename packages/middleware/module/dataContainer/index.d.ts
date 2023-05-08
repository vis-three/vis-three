import { Subject, Subscription } from "rxjs";
import { SymbolConfig } from "../common";
import { CompilerTarget } from "../compiler";
export interface ProxyNotice {
    operate: "add" | "set" | "delete";
    path: string;
    key: string;
    value: any;
}
export declare class DataContainer<C extends SymbolConfig> extends Subject<ProxyNotice> {
    static generator: () => any;
    container: CompilerTarget<C>;
    subscriptions: Map<string, Subscription>;
    constructor();
    add(config: C): void;
    remove(vid: string): void;
}
