import { BasicEventConfig, EventGenerator, Vector3Config } from "@vis-three/middleware";
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
