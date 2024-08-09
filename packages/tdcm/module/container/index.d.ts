import { Subject, Subscription } from "rxjs";
import { BasicConfig } from "../common";
import { ObNotice } from "../observer/Observer";
export interface CtnNotice extends ObNotice {
    symbol: string;
}
export declare class Container<C extends BasicConfig> extends Subject<CtnNotice> {
    space: Record<string, C>;
    subscriptions: Map<string, Subscription>;
    constructor();
    add(config: C): void;
    remove(vid: string): void;
}
