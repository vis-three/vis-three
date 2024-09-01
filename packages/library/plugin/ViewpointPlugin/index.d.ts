import { BaseEvent, Engine, Plugin } from "@vis-three/core";
export interface Vector3Config {
    x: number;
    y: number;
    z: number;
}
export declare enum VIEWPOINT {
    DEFAULT = "default",
    TOP = "top",
    BOTTOM = "bottom",
    LEFT = "left",
    RIGHT = "right",
    FRONT = "front",
    BACK = "back"
}
export interface ViewpointEvent extends BaseEvent {
    viewpoint: VIEWPOINT;
}
export interface ViewpointEngine extends Engine {
    /**设置相机的观察视角 */
    setViewpoint: (viewpoint: VIEWPOINT) => Engine;
}
export interface ViewpointParameters {
    /**透视相机设置 */
    perspective?: {
        /**透视相机的初始位置 */
        position?: Vector3Config;
        /**透视相机的看向点 */
        lookAt?: Vector3Config;
        /**透视相机的正方向 */
        up?: Vector3Config;
    };
    /**正交相机设置 */
    orthograpbic?: {
        /**相机距离观察面的距离 */
        distance?: number;
        /**相机正方向 */
        up?: Vector3Config;
        /**允许旋转 */
        allowRotate?: boolean;
    };
}
export declare const SETVIEWPOINT = "setViewpoint";
export declare const VIEWPOINT_PLUGIN: string;
export declare const ViewpointPlugin: Plugin<ViewpointEngine, ViewpointParameters>;
