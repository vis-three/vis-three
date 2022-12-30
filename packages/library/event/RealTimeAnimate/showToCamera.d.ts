import { BasicEventConfig, EventGenerator, Vector3Config } from "@vis-three/middleware";
import { TIMINGFUNCTION } from "./common";
export interface ShowToCamera extends BasicEventConfig {
    params: {
        target: string;
        offset: Vector3Config;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
        back: boolean;
    };
}
export declare const config: ShowToCamera;
export declare const generator: EventGenerator<ShowToCamera>;
