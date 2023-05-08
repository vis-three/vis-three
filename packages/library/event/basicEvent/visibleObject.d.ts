import { BasicEventConfig, EventGenerator } from "@vis-three/middleware";
export interface VisibleObject extends BasicEventConfig {
    params: {
        target: string;
        visible: boolean;
        delay: number;
    };
}
export declare const config: VisibleObject;
export declare const generator: EventGenerator<VisibleObject>;
