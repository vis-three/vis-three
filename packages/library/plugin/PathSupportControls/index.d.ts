import { Plugin } from "@vis-three/core";
import { EngineSupport } from "@vis-three/tdcm";
import { PathSupportControls } from "./PathSupportControls";
export interface PathSupportControlsEngine extends EngineSupport {
    pathSupportControls: PathSupportControls;
}
export interface PathSupportControlsParameters {
    raycaster?: {
        params: {
            Line?: {
                threshold: number;
            };
            Points?: {
                threshold: number;
            };
        };
    };
}
export declare const PATH_SUPPORT_CONTROLS_PLUGIN: string;
export declare const PathSupportControlsPlugin: Plugin<PathSupportControlsEngine, PathSupportControlsParameters>;
