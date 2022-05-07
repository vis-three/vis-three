import {
  BufferGeometry,
  EdgesGeometry,
  Intersection,
  PlaneBufferGeometry,
  Raycaster,
} from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";

export class CSS3DPlane extends CSS3DObject {
  private geometry: BufferGeometry;

  constructor(element: HTMLElement = document.createElement("div")) {
    super(element);

    const boundingBox = element.getBoundingClientRect();
    this.geometry = new PlaneBufferGeometry(
      boundingBox.width,
      boundingBox.height
    );
    this.geometry.computeBoundingBox();
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const matrixWorld = this.matrixWorld;
    const box = this.geometry.boundingBox!.clone();

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
