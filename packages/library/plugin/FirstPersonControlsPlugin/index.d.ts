import { Engine, Plugin } from "@vis-three/core";
import { FirstPersonControls } from "./FirstPersonControls";
export interface FirstPersonControlsEngine extends Engine {
    firstPersonControls: FirstPersonControls;
}
export interface FirstPersonControlsParameters {
    /**移动速度 */
    movementSpeed?: number;
    /**转向速度 */
    lookSpeed?: number;
    /**是否能够垂直环视 */
    lookVertical?: boolean;
    /**是否会自动前进 */
    autoForward?: boolean;
    /**是否能够环视四周 */
    activeLook?: boolean;
    /**升高速度 */
    heightSpeed?: boolean;
    /**升高系数 */
    heightCoef?: number;
    /**最低高度 */
    heightMin?: number;
    /**最高高度 */
    heightMax?: number;
}
export declare const FIRST_PERSON_CONTROLS_PLUGIN: string;
export declare const FirstPersonControlsPlugin: Plugin<FirstPersonControlsEngine>;
