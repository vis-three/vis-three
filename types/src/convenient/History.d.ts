export declare class Action {
    next(): void;
    prev(): void;
}
export declare class History {
    private actionList;
    private index;
    private step;
    constructor(step?: number);
    private do;
    /**
     * 注册动作
     * @param action new class extends BasicAction
     * @param exec 是否立即执行动作的next
     */
    apply(action: Action, exec?: boolean): void;
    redo(): void;
    undo(): void;
    clear(): void;
}
