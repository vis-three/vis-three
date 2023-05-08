import { BasicEventConfig, EventGenerator, Vector3Config } from "@vis-three/middleware";
import { TIMINGFUNCTION } from "./common";
export interface MoveTo extends BasicEventConfig {
    params: {
        target: string;
        position: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: MoveTo;
export declare const generator: EventGenerator<MoveTo>;
