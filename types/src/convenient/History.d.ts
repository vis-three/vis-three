export interface Action {
    next: () => void;
    prev: () => void;
}
export declare class History {
    private actionList;
    private index;
    private step;
    constructor(step?: number);
    private do;
    apply(action: Action, exec?: boolean): void;
    redo(): void;
    undo(): void;
    clear(): void;
}
