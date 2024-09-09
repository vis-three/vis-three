import { Vector3Config } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { TIMINGFUNCTION } from "./common";
export interface MoveSpacing extends BasicEventConfig {
    params: {
        target: string;
        spacing: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: MoveSpacing;
export declare const generator: EventGenerator<MoveSpacing>;
