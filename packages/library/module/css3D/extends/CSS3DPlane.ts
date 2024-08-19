import { Box3, Intersection, Raycaster } from "three";
import { VisCSS3DObject } from "./VisCSS3DObject";

export class CSS3DPlane extends VisCSS3DObject {
  protected cacheBox: Box3 = new Box3();

  constructor(element: HTMLElement = document.createElement("div")) {
    super(element);
    //@ts-ignore
    this.type = "CSS3DPlane";
    this.element.classList.add("vis-css3d", "vis-css3d-plane");
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
