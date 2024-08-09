export declare class Scheduler {
    private static list;
    private static timer?;
    static time: number;
    static exec(fun: (finish: boolean) => boolean): void;
    static append(fun: (finish: boolean) => boolean): void;
    static nextTick(fun: () => boolean): void;
}
