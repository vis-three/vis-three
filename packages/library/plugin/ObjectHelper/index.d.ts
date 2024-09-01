import { BaseEvent, Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
import { ObjectHelperManager } from "./ObjectHelperManager";
export * from "./ObjectHelperManager";
export interface ObjectHelperParameters {
    /**是否会与辅助进行交互 */
    interact?: boolean;
    /** */
    activeColor?: string;
    hoverColor?: string;
    defaultColor?: string;
    selectedColor?: string;
}
export interface ObjectHelperEngine extends Engine {
    /**物体辅助管理器 */
    objectHelperManager: ObjectHelperManager;
    /**设置物体辅助显示隐藏 */
    setObjectHelper: (show: boolean) => ObjectHelperEngine;
}
export interface AfterAddEvent extends BaseEvent {
    objects: Object3D[];
}
export interface AfterRemoveEvent extends BaseEvent {
    objects: Object3D[];
}
export declare const AFTERADD = "afterAdd";
export declare const AFTERREMOVE = "afterRemove";
export declare const OBJECT_HELPER_PLUGIN: string;
export declare const ObjectHelperPlugin: Plugin<ObjectHelperEngine, object>;
