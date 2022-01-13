import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { MOUSE } from 'three';
export class VisOrbitControls extends OrbitControls {
    constructor(camera, domElement) {
        super(camera, domElement);
        this.mouseButtons = {
            LEFT: null,
            MIDDLE: MOUSE.DOLLY,
            RIGHT: MOUSE.ROTATE
        };
    }
    setCamera(camera) {
        this.object = camera;
        this.update();
        return this;
    }
}
//# sourceMappingURL=VisOrbitControls.js.map