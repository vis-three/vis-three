import { TIMINGFUNCTION } from "./common";
import { BasicEventConfig, EngineSupport, EventGenerator, Vector3Config } from "@vis-three/middleware";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
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
