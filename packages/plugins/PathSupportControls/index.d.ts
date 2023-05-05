import { Plugin } from "@vis-three/core";
import { EngineSupport } from "@vis-three/middleware";
import { PathSupportControls } from "./PathSupportControls";
export interface PathSupportControlsEngine extends EngineSupport {
    pathSupportControls: PathSupportControls;
}
export declare const PATH_SUPPORT_CONTROLS_PLUGIN: string;
export declare const PathSupportControlsPlugin: Plugin<PathSupportControlsEngine, object>;
