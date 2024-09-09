import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { TIMINGFUNCTION } from "./common";
export interface FadeObject extends BasicEventConfig {
    params: {
        target: string;
        direction: "in" | "out";
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
        visible: boolean;
    };
}
export declare const config: FadeObject;
export declare const generator: EventGenerator<FadeObject>;
