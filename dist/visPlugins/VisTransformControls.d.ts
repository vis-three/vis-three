import { Object3D } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { VisCamera } from '../visObject/visCamera/VisCamera';
export declare class VisTransformControls extends TransformControls {
    private target;
    constructor(camera: VisCamera, dom: HTMLElement);
    getTarget(): Object3D;
    setCamera(camera: VisCamera): this;
}
//# sourceMappingURL=VisTransformControls.d.ts.map