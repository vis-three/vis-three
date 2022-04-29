import { BaseEvent, Event, Object3D, Scene } from "three";
export interface SceneAddEvent extends BaseEvent {
    type: "afterAdd";
    objects: Object3D[];
}
export interface SceneRemoveEvent extends BaseEvent {
    type: "afterRemove";
    objects: Object3D[];
}
export declare class VisScene extends Scene {
    add(...object: Object3D<Event>[]): this;
    remove(...object: Object3D<Event>[]): this;
}
