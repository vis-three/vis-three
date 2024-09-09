import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { SceneEngineSupport } from "@vis-three/module-scene";
export interface SetParent extends BasicEventConfig {
    params: {
        target: string;
        parent: string;
        delay: number;
    };
}
export declare const config: SetParent;
export declare const generator: EventGenerator<SetParent, SceneEngineSupport>;
