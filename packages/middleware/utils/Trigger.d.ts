export interface Trigger {
    trig: Function;
    test: () => boolean;
}
export declare abstract class ModuleTrigger implements Trigger {
    condition: Record<string, boolean>;
    registerModule(module: string): this;
    updateCondition(module: string): this;
    reset(): void;
    test(): boolean;
    trig(): void;
}
export declare class ObjectModuleTrigger extends ModuleTrigger {
    private triggerList;
    constructor();
    registerModule(module: string): this;
    registerExec(fun: (immediate?: boolean) => boolean): void;
    trig(): void;
    reset(): void;
}
export declare const globalObjectModuleTrigger: ObjectModuleTrigger;
