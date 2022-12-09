import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
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
