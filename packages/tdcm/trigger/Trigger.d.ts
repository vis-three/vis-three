export declare class Trigger {
    private condition;
    private list;
    private validator;
    constructor(validator?: (module: string) => boolean);
    add(module: string): this;
    reach(module: string): this;
    register(fun: () => boolean): void;
    trig(): void;
    reset(): void;
    check(): boolean;
}
/**
 * @deprecated use ObjectTrigger
 */
export declare const globalObjectModuleTrigger: Trigger;
