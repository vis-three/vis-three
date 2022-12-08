export declare class AntiShake {
    private list;
    private timer?;
    time: number;
    exec(fun: (finish: boolean) => boolean): void;
    append(fun: (finish: boolean) => boolean): void;
    force(fun: () => boolean): void;
}
export declare const antiShake: AntiShake;
