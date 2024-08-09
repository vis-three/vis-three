export declare class AntiShake {
    private list;
    private timer?;
    time: number;
    exec(fun: (finish: boolean) => boolean): void;
    append(fun: (finish: boolean) => boolean): void;
    nextTick(fun: () => boolean): void;
}
/**
 * @deprecated use Scheduler
 */
export declare const globalAntiShake: AntiShake;
