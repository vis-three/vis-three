import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Camera } from 'three';
export declare class VisOrbitControls extends OrbitControls {
    constructor(camera: Camera, domElement?: HTMLElement);
    setCamera(camera: Camera): this;
}
