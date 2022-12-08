import { Observer } from "./Observer";
export declare class Watcher {
    static map: Map<Symbol, Watcher>;
    token: symbol;
    private target;
    private path;
    private dep;
    private ob;
    private run;
    constructor(fun: () => any);
    init(path: string, target: object, ob: Observer): void;
    notify(path: string): void;
    update(): void;
}
