import { BaseEvent, Camera, Object3D } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
export declare enum TRANSFORMEVENT {
    OBJECTCHANGED = "objectChanged"
}
export interface ObjectChangedEvent extends BaseEvent {
    type: 'objectChanged';
    transObjectSet: Set<Object3D>;
    mode: string;
    target: Object3D;
}
export declare class VisTransformControls extends TransformControls {
    target: Object3D;
    private transObjectSet;
    constructor(camera: Camera, dom: HTMLElement);
    getTarget(): Object3D;
    getTransObjectSet(): Set<Object3D>;
    setCamera(camera: Camera): this;
    setAttach(...object: Object3D[]): this;
}
