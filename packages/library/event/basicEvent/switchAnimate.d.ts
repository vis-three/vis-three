import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
export interface SwitchAnimate extends BasicEventConfig {
    params: {
        target: string;
        toggle: "auto" | "on" | "off";
        delay: 0;
    };
}
export declare const config: SwitchAnimate;
export declare const generator: EventGenerator<SwitchAnimate>;
