import { VisCSS3DObject } from "./VisCSS3DObject";
export class CSS3DPlane extends VisCSS3DObject {
    constructor(element = document.createElement("div")) {
        super(element);
        this.element.classList.add("vis-css3d-plane");
    }
    raycast(raycaster, intersects) {
        const box = this.cacheBox.copy(this.geometry.boundingBox);
        box.applyMatrix4(this.matrixWorld);
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