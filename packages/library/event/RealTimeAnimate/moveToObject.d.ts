import { Vector3Config } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { TIMINGFUNCTION } from "./common";
export interface MoveToObject extends BasicEventConfig {
    params: {
        target: string;
        to: string;
        offset: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: MoveToObject;
export declare const generator: EventGenerator<MoveToObject>;
