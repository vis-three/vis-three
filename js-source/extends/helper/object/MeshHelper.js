import { EdgesGeometry, LineSegments } from "three";
import { getHelperLineMaterial } from "../common";
export class MeshHelper extends LineSegments {
    target;
    type = 'VisMeshHelper';
    cachaGeometryUUid; // 存uuid防止内存泄漏
    constructor(mesh) {
        super();
        const thresholdAngle = 1;
        this.target = mesh;
        this.geometry = new EdgesGeometry(mesh.geometry, thresholdAngle);
        this.cachaGeometryUUid = mesh.geometry.uuid;
        this.material = getHelperLineMaterial();
        this.raycast = () => { };
        this.matrixAutoUpdate = false;
        this.matrixWorldNeedsUpdate = false;
        this.matrix = mesh.matrix;
        this.matrixWorld = mesh.matrixWorld;
        this.onBeforeRender = () => {
            const target = this.target;
            if (target.geometry.uuid !== this.cachaGeometryUUid) {
                this.geometry.dispose();
                this.geometry = new EdgesGeometry(target.geometry, thresholdAngle);
                this.cachaGeometryUUid = target.geometry.uuid;
            }
        };
    }
}
//# sourceMappingURL=MeshHelper.js.map