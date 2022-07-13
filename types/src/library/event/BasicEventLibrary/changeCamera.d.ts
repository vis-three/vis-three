import { BasicEventConfig, EventGenerator } from "../EventLibrary";
export interface ChangeCamera extends BasicEventConfig {
    params: {
        camera: string;
        delay: number;
    };
}
export declare const config: ChangeCamera;
export declare const generator: EventGenerator<ChangeCamera>;
