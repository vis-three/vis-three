import { BoxBufferGeometry, EdgesGeometry, LineSegments } from "three";
import { getHelperLineMaterial } from "../common";
export class GroupHelper extends LineSegments {
    target;
    type = 'VisGroupHelper';
    constructor(group) {
        super();
        this.target = group;
        const geometry = new EdgesGeometry(new BoxBufferGeometry(1, 1, 1));
        geometry.computeBoundingBox();
        this.geometry = geometry;
        this.material = getHelperLineMaterial();
        this.material.depthTest = false;
        this.material.depthWrite = false;
        this.matrixAutoUpdate = false;
        this.matrix = group.matrix;
    }
    raycast(raycaster, intersects) {
        const matrixWorld = this.matrixWorld;
        const box = this.geometry.boundingBox.clone();
        box.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsBox(box)) {
            const target = this.target;
            intersects.push({
                distance: raycaster.ray.origin.distanceTo(target.position),
                object: target,
                point: target.position
            });
        }
    }
}
//# sourceMappingURL=GroupHelper.js.map