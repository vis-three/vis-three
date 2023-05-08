import { BasicEventConfig, EngineSupport, EventGenerator, Vector3Config } from "@vis-three/middleware";
import { TIMINGFUNCTION } from "./common";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
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
export interface OrbitSupportEngine extends EngineSupport, OrbitControlsEngine {
}
export declare const generator: EventGenerator<FocusObject>;
