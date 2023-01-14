import { Engine, Plugin } from "@vis-three/core";
import { KeyboardMoveControls } from "./KeyboardMoveControls";
export interface KeyboardMoveControlsEngine extends Engine {
    keyboardMoveControls: KeyboardMoveControls;
}
export interface FirstPersonControlsParameters {
    movementSpeed?: number;
}
export declare const KEYBOARD_MOVE_CONTROLS_PLUGIN: string;
export declare const KeyboardMoveControlsPlugin: Plugin<KeyboardMoveControlsEngine>;
