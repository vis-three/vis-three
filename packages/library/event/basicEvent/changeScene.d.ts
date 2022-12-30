import { BasicEventConfig, EventGenerator } from "@vis-three/middleware";
export interface ChangeScene extends BasicEventConfig {
    params: {
        scene: string;
        delay: number;
    };
}
export declare const config: ChangeScene;
export declare const generator: EventGenerator<ChangeScene>;
