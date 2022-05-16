import { EdgesGeometry, LineSegments, PlaneBufferGeometry, } from "three";
import { getHelperLineMaterial } from "../common";
export class CSS3DObjectHelper extends LineSegments {
    target;
    // @ts-ignore
    type = "VisCSS3DHelper";
    constructor(target) {
        super();
        const element = target.element;
        const boundingBox = element.getBoundingClientRect();
        const width = boundingBox.width;
        const height = boundingBox.height;
        this.geometry = new EdgesGeometry(new PlaneBufferGeometry(width, height));
        this.geometry.computeBoundingBox();
        this.material = getHelperLineMaterial();
        this.matrixAutoUpdate = false;
        this.matrix = target.matrix;
        this.matrixWorldNeedsUpdate = false;
        this.matrixWorld = target.matrixWorld;
        this.target = target;
    }
    raycast(raycaster, intersects) {
        const target = this.target;
        const matrixWorld = target.matrixWorld;
        const box = this.geometry.boundingBox.clone();
        box.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsBox(box)) {
            intersects.push({
                distance: raycaster.ray.origin.distanceTo(target.position),
                object: target,
                point: target.position,
            });
        }
    }
}
//# sourceMappingURL=CSS3DObjectHelper.js.map