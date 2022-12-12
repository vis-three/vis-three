import { Engine, Plugin, VisOrbitControls } from "@vis-three/core";
export interface OrbitControlsEngine extends Engine {
    orbitControls: VisOrbitControls;
}
export declare const name: string;
export declare const OrbitControlsPlugin: Plugin<OrbitControlsEngine>;
