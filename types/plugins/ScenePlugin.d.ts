import { BaseEvent, Object3D } from "three";
import { Plugin } from "./plugin";
export interface SceneParameters {
}
export interface SceneAddEvent extends BaseEvent {
    type: 'afterAdd';
    objects: Object3D[];
}
export interface SceneRemoveEvent extends BaseEvent {
    type: 'afterRemove';
    objects: Object3D[];
}
export declare const ScenePlugin: Plugin<SceneParameters>;
