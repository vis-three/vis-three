import { Vector3Config } from "@vis-three/tdcm";
import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { SceneEngineSupport } from "@vis-three/module-scene";
export interface SetPosition extends BasicEventConfig {
    params: {
        target: string;
        position: Vector3Config;
        delay: number;
    };
}
export declare const config: SetPosition;
export declare const generator: EventGenerator<SetPosition, SceneEngineSupport>;
