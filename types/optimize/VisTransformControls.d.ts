import { BaseEvent, Camera, Object3D } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
export declare enum VISTRANSFORMEVENTTYPE {
    OBJECTCHANGE = "objectChange",
    OBJECTCHANGED = "objectChanged"
}
export interface ObjectChangedEvent extends BaseEvent {
    type: VISTRANSFORMEVENTTYPE.OBJECTCHANGED;
    transObjectSet: Set<Object3D>;
    mode: string;
}
export declare class VisTransformControls extends TransformControls {
    private target;
    private transObjectSet;
    constructor(camera: Camera, dom: HTMLElement);
    getTarget(): Object3D;
    setCamera(camera: Camera): this;
    setAttach(...object: Object3D[]): this;
}
