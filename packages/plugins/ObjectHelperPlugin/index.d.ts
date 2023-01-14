import { BaseEvent, Engine, Plugin } from "@vis-three/core";
import { Object3D } from "three";
import { ObjectHelperManager } from "./ObjectHelperManager";
export * from "./ObjectHelperManager";
export interface ObjectHelperParameters {
    interact?: boolean;
    activeColor?: string;
    hoverColor?: string;
    defaultColor?: string;
    selectedColor?: string;
}
export interface ObjectHelperEngine extends Engine {
    objectHelperManager: ObjectHelperManager;
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
export declare const ObjectHelperPlugin: Plugin<ObjectHelperEngine>;
