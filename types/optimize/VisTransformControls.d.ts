import { Camera, Object3D } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
export declare class VisTransformControls extends TransformControls {
    private target;
    constructor(camera: Camera, dom: HTMLElement);
    getTarget(): Object3D;
    setCamera(camera: Camera): this;
}
