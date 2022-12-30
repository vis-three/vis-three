import { TIMINGFUNCTION } from "./common";
import { BasicEventConfig, EventGenerator, Vector3Config } from "@vis-three/middleware";
export interface OrbitTargetMove extends BasicEventConfig {
    params: {
        target: string;
        offset: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: OrbitTargetMove;
export declare const generator: EventGenerator<OrbitTargetMove>;
