import { BasicEventConfig, EventGenerator } from "@vis-three/middleware";
export interface AddClass extends BasicEventConfig {
    params: {
        target: string | string[] | "all";
        className: string;
        delay: number;
    };
}
export declare const config: AddClass;
export declare const generator: EventGenerator<AddClass>;
