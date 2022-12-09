import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { TIMINGFUNCTION } from "./common";
export interface RotationTo extends BasicEventConfig {
    params: {
        target: string;
        rotation: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: RotationTo;
export declare const generator: EventGenerator<RotationTo>;
