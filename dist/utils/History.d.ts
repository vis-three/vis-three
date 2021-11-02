export interface HistoryAction {
    name: string;
    next: Function;
    prev: Function;
}
export declare class History {
    private actionList;
    private index;
    private maxStep;
    constructor();
    addAction(fun: HistoryAction): this;
    redo(): this;
    undo(): this;
}
//# sourceMappingURL=History.d.ts.map