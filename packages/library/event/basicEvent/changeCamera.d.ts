import { BasicEventConfig, EventGenerator } from "@vis-three/module-object";
import { CameraEngineSupport } from "@vis-three/module-camera";
export interface ChangeCamera extends BasicEventConfig {
    params: {
        camera: string;
        delay: number;
    };
}
export declare const config: ChangeCamera;
export declare const generator: EventGenerator<ChangeCamera, CameraEngineSupport>;
