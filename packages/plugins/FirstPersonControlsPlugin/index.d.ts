import { Engine, Plugin } from "@vis-three/core";
import { FirstPersonControls } from "./FirstPersonControls";
export interface FirstPersonControlsEngine extends Engine {
    firstPersonControls: FirstPersonControls;
}
export interface FirstPersonControlsParameters {
    movementSpeed?: number;
    lookSpeed?: number;
    lookVertical?: boolean;
    autoForward?: boolean;
    activeLook?: boolean;
    heightSpeed?: boolean;
    heightCoef?: number;
    heightMin?: number;
    heightMax?: number;
}
export declare const FIRST_PERSON_CONTROLS_PLUGIN: string;
export declare const FirstPersonControlsPlugin: Plugin<FirstPersonControlsEngine>;
