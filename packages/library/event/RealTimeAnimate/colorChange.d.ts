import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { TIMINGFUNCTION } from "./common";
export interface ColorChange extends BasicEventConfig {
    params: {
        target: string;
        attribute: string;
        color: string;
        delay: number;
        duration: number;
        timingFunction: TIMINGFUNCTION;
    };
}
export declare const config: ColorChange;
export declare const generator: EventGenerator<ColorChange>;
