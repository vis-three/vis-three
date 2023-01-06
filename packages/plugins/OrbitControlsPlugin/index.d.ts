import { Engine, Plugin } from "@vis-three/core";
import { VisOrbitControls } from "./VisOrbitControls";
export interface OrbitControlsEngine extends Engine {
    orbitControls: VisOrbitControls;
}
export declare const ORBIT_CONTROLS_PLUGIN: string;
export declare const OrbitControlsPlugin: Plugin<OrbitControlsEngine>;
