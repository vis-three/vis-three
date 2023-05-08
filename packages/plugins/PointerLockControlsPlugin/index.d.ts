import { Engine, Plugin } from "@vis-three/core";
import { PointerLockControls } from "./PointerLockControls";
export interface PointerLockControlsEngine extends Engine {
    pointerLockControls: PointerLockControls;
}
export declare const POINTER_LOCK_CONTROLS_PLUGIN: string;
export declare const PointerLockControlsPlugin: Plugin<PointerLockControlsEngine>;
