import { BasicEventConfig, EngineSupport, EventGenerator } from "@vis-three/middleware";
export interface ChangeCursor extends BasicEventConfig {
    params: {
        cursor: string;
        delay: number;
    };
}
export declare const config: ChangeCursor;
export declare const generator: EventGenerator<ChangeCursor, EngineSupport>;
