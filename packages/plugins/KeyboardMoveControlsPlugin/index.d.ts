import { Engine, Plugin } from "@vis-three/core";
import { Object3D, Vector3 } from "three";
import { AfterUpdateEvent, BeforeUpdateEvent, KeyboardMoveControls } from "./KeyboardMoveControls";
export interface KeyboardMoveControlsEngine extends Engine {
    keyboardMoveControls: KeyboardMoveControls;
}
export interface FirstPersonControlsParameters {
    target?: Object3D;
    movementSpeed?: number;
    quickenSpeed?: number;
    space?: "local" | "world";
    forwrad?: Vector3 | ((object: Object3D) => Vector3);
    extendKeyDown?: (event: KeyboardEvent) => void;
    extendKeyUp?: (event: KeyboardEvent) => void;
    beforeUpdate?: (event: BeforeUpdateEvent) => void;
    afterUpdate?: (event: AfterUpdateEvent) => void;
}
export declare const KEYBOARD_MOVE_CONTROLS_PLUGIN: string;
export declare const KeyboardMoveControlsPlugin: Plugin<KeyboardMoveControlsEngine>;
