import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { VisCamera } from '../visObject/visCamera/VisCamera';
export declare class VisOrbitControls extends OrbitControls {
    constructor(camera: VisCamera, domElement?: HTMLElement);
    setCamera(camera: VisCamera): this;
}
//# sourceMappingURL=VisOrbitControls.d.ts.map