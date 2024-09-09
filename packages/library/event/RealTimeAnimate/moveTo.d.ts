import { Vector3Config } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
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
