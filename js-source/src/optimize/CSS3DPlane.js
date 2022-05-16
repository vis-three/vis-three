import { PlaneBufferGeometry, } from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
export class CSS3DPlane extends CSS3DObject {
    geometry;
    constructor(element = document.createElement("div")) {
        super(element);
        const boundingBox = element.getBoundingClientRect();
        this.geometry = new PlaneBufferGeometry(boundingBox.width, boundingBox.height);
        this.geometry.computeBoundingBox();
    }
    raycast(raycaster, intersects) {
        const matrixWorld = this.matrixWorld;
        const box = this.geometry.boundingBox.clone();
        box.applyMatrix4(matrixWorld);
        if (raycaster.ray.intersectsBox(box)) {
            intersects.push({
                distance: raycaster.ray.origin.distanceTo(this.position),
                object: this,
                point: this.position,
            });
        }
    }
}
//# sourceMappingURL=CSS3DPlane.js.map