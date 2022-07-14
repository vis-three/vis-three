import { Vector3Config } from "../../../middleware/common/CommonConfig";
import { BasicEventConfig, EventGenerator } from "../EventLibrary";
import { TIMINGFUNCTION } from "./common";
export interface FocusObject extends BasicEventConfig {
    params: {
        target: string;
        camera: string;
        space: "local" | "world";
        offset: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
        back: boolean;
    };
}
export declare const config: FocusObject;
export declare const generator: EventGenerator<FocusObject>;
