import { Engine, Plugin } from "@vis-three/core";
import { MOUSE_BUTTON, PointerVisualControls } from "./PointerVisualControls";
export * from "./PointerVisualControls";
export interface PointerVisualControlsEngine extends Engine {
    pointerVisualControls: PointerVisualControls;
}
export interface PointerLockControlsPluginParams {
    /**触发控制器的鼠标键 */
    pointerButton?: MOUSE_BUTTON;
    /**最小极角 */
    minPolarAngle?: number;
    /**最大极角 */
    maxPolarAngle?: number;
    /**指针旋转速度 */
    pointerSpeed?: number;
}
export declare const POINTER_VISUAL_CONTROLS_PLUGIN: string;
export declare const PointerVisualControlsPlugin: Plugin<PointerVisualControlsEngine>;
