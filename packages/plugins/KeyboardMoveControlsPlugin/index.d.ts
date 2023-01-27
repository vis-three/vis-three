import { Engine, Plugin } from "@vis-three/core";
import { Object3D, Vector3 } from "three";
import { KeyboardMoveControls } from "./KeyboardMoveControls";
export interface KeyboardMoveControlsEngine extends Engine {
    keyboardMoveControls: KeyboardMoveControls;
}
export interface FirstPersonControlsParameters {
    target?: Object3D;
    movementSpeed?: number;
    quickenSpeed?: number;
    space?: "local" | "world";
    forwrad?: Vector3;
}
export declare const KEYBOARD_MOVE_CONTROLS_PLUGIN: string;
export declare const KeyboardMoveControlsPlugin: Plugin<KeyboardMoveControlsEngine>;
