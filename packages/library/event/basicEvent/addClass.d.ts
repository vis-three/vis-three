import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
export interface AddClass extends BasicEventConfig {
    params: {
        target: string | string[] | "all";
        className: string;
        delay: number;
    };
}
export declare const config: AddClass;
export declare const generator: EventGenerator<AddClass>;
