import { TIMINGFUNCTION } from "./common";
import { EngineSupport, Vector3Config } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { OrbitControlsEngine } from "@vis-three/plugin-orbit-controls";
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
export interface OrbitSupportEngine extends EngineSupport, Pick<OrbitControlsEngine, "orbitControls"> {
}
export declare const generator: EventGenerator<OrbitTargetMove>;
