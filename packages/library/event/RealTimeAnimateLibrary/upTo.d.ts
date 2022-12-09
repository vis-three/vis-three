import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { TIMINGFUNCTION } from "./common";
export interface UpTo extends BasicEventConfig {
    params: {
        target: string;
        up: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: UpTo;
export declare const generator: EventGenerator<UpTo>;
