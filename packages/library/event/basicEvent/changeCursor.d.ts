import { EngineSupport } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
export interface ChangeCursor extends BasicEventConfig {
    params: {
        cursor: string;
        delay: number;
    };
}
export declare const config: ChangeCursor;
export declare const generator: EventGenerator<ChangeCursor, EngineSupport>;
