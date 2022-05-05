import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { TIMEINGFUNCTION } from "./common";
export interface MoveSpacing extends BasicEventConfig {
    params: {
        target: string;
        spacing: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMEINGFUNCTION;
    };
}
export declare const config: MoveSpacing;
export declare const generator: EventGenerator<MoveSpacing>;
