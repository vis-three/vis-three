import { CSS3DPlane } from "@vis-three/core";
import {
  EdgesGeometry,
  Intersection,
  LineSegments,
  PlaneBufferGeometry,
  Raycaster,
} from "three";
import { getHelperLineMaterial, VisHelper } from "../common";

export class CSS3DPlaneHelper extends LineSegments implements VisHelper {
  target: CSS3DPlane;
  // @ts-ignore
  type = "VisCSS3DPlaneHelper";

  private observer: MutationObserver;

  constructor(target: CSS3DPlane) {
    super();
    this.geometry = new EdgesGeometry(
      new PlaneBufferGeometry(target.width, target.height)
    );
    this.geometry.computeBoundingBox();

    this.material = getHelperLineMaterial();

    this.matrixAutoUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorld = target.matrixWorld;

    this.target = target;

    const observer = new MutationObserver(() => {
      this.geometry.dispose();
      this.geometry = new EdgesGeometry(
        new PlaneBufferGeometry(target.width, target.height)
      );
      this.geometry.computeBoundingBox();
    });

    observer.observe(target.element, {
      attributeFilter: ["style"],
    });

    this.observer = observer;

    this.raycast = () => {};
    this.updateMatrixWorld = () => {};
  }

  dispose() {
    this.observer.disconnect();
  }
}
