import { EngineSupport } from "@vis-three/middleware";
import { ControlsCompiler } from "@vis-three/module-controls/ControlsCompiler";
import { ControlsConfig } from "@vis-three/module-controls/ControlsConfig";
import { PathSupportControlsEngine } from "@vis-three/plugin-path-support-controls";
import { PathSupportControls } from "@vis-three/plugin-path-support-controls/PathSupportControls";
export interface PathSupportControlsConfig extends ControlsConfig {
    object: string | null;
    config: string | null;
    visible: boolean;
}
export declare const getPathSupportControlsConfig: () => PathSupportControlsConfig;
export interface PathSupportControlsEngineSupport extends EngineSupport, PathSupportControlsEngine {
}
declare const _default: import("@vis-three/middleware").Processor<PathSupportControlsConfig, PathSupportControls, PathSupportControlsEngineSupport, ControlsCompiler>;
export default _default;
