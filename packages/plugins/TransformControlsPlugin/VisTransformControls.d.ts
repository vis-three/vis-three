import { BaseEvent, Camera, Object3D } from "three";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
export declare enum TRANSFORM_EVENT {
    CHANGED = "changed",
    MOUSE_DOWN = "mouseDown",
    CHANGEING = "objectChange",
    MOUSE_UP = "mouseUp"
}
export interface ObjectChangedEvent extends BaseEvent {
    type: TRANSFORM_EVENT.CHANGED;
    transObjectSet: Set<Object3D>;
    mode: string;
    target: Object3D;
}
export declare class VisTransformControls extends TransformControls {
    target: Object3D;
    private transObjectSet;
    constructor(camera?: Camera, dom?: HTMLElement);
    setDom(dom: HTMLElement): this;
    setCamera(camera: Camera): this;
    getTarget(): Object3D;
    getTransObjectSet(): Set<Object3D>;
    setAttach(...object: Object3D[]): this;
}
