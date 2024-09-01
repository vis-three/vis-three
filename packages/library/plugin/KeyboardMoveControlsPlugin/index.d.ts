import { Engine, Plugin } from "@vis-three/core";
import { Object3D, Vector3 } from "three";
import { AfterUpdateEvent, BeforeUpdateEvent, KeyboardMoveControls } from "./KeyboardMoveControls";
export interface KeyboardMoveControlsEngine extends Engine {
    keyboardMoveControls: KeyboardMoveControls;
}
export interface KeyboardMoveControlsParameters {
    /**被控制目标物体 */
    target?: Object3D;
    /**物体移动速度 */
    movementSpeed?: number;
    /**物体加速时的速度 */
    quickenSpeed?: number;
    /**移动方向是基于物体矩阵还是世界矩阵 */
    space?: "local" | "world";
    /**物体的正前方朝向，可以通过方法获取 */
    forwrad?: Vector3 | ((object: Object3D) => Vector3);
    /**扩展的键盘按下时的方法 */
    extendKeyDown?: (event: KeyboardEvent) => void;
    /**扩展的键盘抬起的方法 */
    extendKeyUp?: (event: KeyboardEvent) => void;
    /**在物体位置更新前的扩展处理方法 */
    beforeUpdate?: (event: BeforeUpdateEvent) => void;
    /**在物体位置更新后的扩展处理方法 */
    afterUpdate?: (event: AfterUpdateEvent) => void;
}
export declare const KEYBOARD_MOVE_CONTROLS_PLUGIN: string;
export declare const KeyboardMoveControlsPlugin: Plugin<KeyboardMoveControlsEngine>;
