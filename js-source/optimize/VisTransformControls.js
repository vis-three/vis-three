import { Object3D } from 'three';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
export class VisTransformControls extends TransformControls {
    target; // 控制器的内部控制目标
    constructor(camera, dom) {
        super(camera, dom);
        this.target = new Object3D();
        this.attach(this.target);
    }
    getTarget() {
        return this.target;
    }
    setCamera(camera) {
        this.camera = camera;
        return this;
    }
}
//# sourceMappingURL=VisTransformControls.js.map