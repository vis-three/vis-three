import { EngineSupport, Vector3Config } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { TIMINGFUNCTION } from "./common";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
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
export interface OrbitSupportEngine extends EngineSupport, Pick<OrbitControlsEngine, "orbitControls"> {
}
export declare const generator: EventGenerator<FocusObject, OrbitSupportEngine>;
