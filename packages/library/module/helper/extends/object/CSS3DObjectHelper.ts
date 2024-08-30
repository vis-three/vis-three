import {
  EdgesGeometry,
  Intersection,
  LineBasicMaterial,
  LineSegments,
  PlaneGeometry,
  Raycaster,
} from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import { getHelperLineMaterial, VisHelper } from "../common";

export class CSS3DObjectHelper extends LineSegments implements VisHelper {
  target: CSS3DObject;
  // @ts-ignore
  type = "VisCSS3DHelper";

  constructor(target: CSS3DObject) {
    super();
    const element = target.element;
    const boundingBox = element.getBoundingClientRect();
    const width = boundingBox.width;
    const height = boundingBox.height;

    this.geometry = new EdgesGeometry(new PlaneGeometry(width, height));
    this.geometry.computeBoundingBox();

    this.material = getHelperLineMaterial();

    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;

    this.target = target;
  }

  raycast(raycaster: Raycaster, intersects: Intersection[]) {
    const target = this.target;
    const matrixWorld = target.matrixWorld;
    const box = this.geometry.boundingBox!.clone();

    box.applyMatrix4(matrixWorld);

    if (raycaster.ray.intersectsBox(box)) {
      intersects.push({
        distance: raycaster.ray.origin.distanceTo(target.position),
        object: target,
        point: target.position,
      });
    }
  }

  dispose() {
    this.geometry.dispose();
    (<LineBasicMaterial>this.material).dispose();
  }
}
