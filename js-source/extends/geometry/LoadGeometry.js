import { BufferGeometry } from "three";
export class LoadGeometry extends BufferGeometry {
    type = 'LoadBufferGeometry';
    constructor(geometry) {
        super();
        geometry && this.copy(geometry);
    }
}
//# sourceMappingURL=LoadGeometry.js.map