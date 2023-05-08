import { Engine, Plugin } from "@vis-three/core";
import { MOUSE_BUTTON, PointerVisualControls } from "./PointerVisualControls";
export * from "./PointerVisualControls";
export interface PointerVisualControlsEngine extends Engine {
    pointerVisualControls: PointerVisualControls;
}
export interface PointerLockControlsPluginParams {
    pointerButton?: MOUSE_BUTTON;
    minPolarAngle?: number;
    maxPolarAngle?: number;
    pointerSpeed?: number;
}
export declare const POINTER_VISUAL_CONTROLS_PLUGIN: string;
export declare const PointerVisualControlsPlugin: Plugin<PointerVisualControlsEngine>;
