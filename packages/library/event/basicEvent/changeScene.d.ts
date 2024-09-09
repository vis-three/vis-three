import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { SceneEngineSupport } from "@vis-three/module-scene";
export interface ChangeScene extends BasicEventConfig {
    params: {
        scene: string;
        delay: number;
    };
}
export declare const config: ChangeScene;
export declare const generator: EventGenerator<ChangeScene, SceneEngineSupport>;
