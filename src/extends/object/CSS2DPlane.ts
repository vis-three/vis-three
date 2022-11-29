import { Box3, Intersection, Raycaster } from "three";
import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";

export class CSS2DPlane extends VisCSS2DObject {
  protected cacheBox: Box3 = new Box3();

  constructor(element: HTMLElement = document.createElement("div")) {
    super(element);
    this.type = "CSS2DPlane";
    this.element.classList.add("vis-css2d", "vis-css2d-plane");
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const box = this.cacheBox.copy(this.geometry.boundingBox!);
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
