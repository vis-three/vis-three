import { Subject } from "rxjs";
import { ReactNotice } from "../Observable";
export declare class Observer extends Subject<ReactNotice> {
    private subscriptions;
    private watchers;
    constructor();
    watch(observed: object): void;
    dispose(): void;
}
