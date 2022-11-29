import { EdgesGeometry, LineSegments, PlaneBufferGeometry } from "three";
import { CSS2DPlane } from "../../object/CSS2DPlane";
import { getHelperLineMaterial, VisHelper } from "../common";

export class CSS2DPlaneHelper extends LineSegments implements VisHelper {
  target: CSS2DPlane;

  type = "VisCSS2DPlaneHelper";
  private observer: MutationObserver;

  constructor(target: CSS2DPlane) {
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
  }

  dispose() {
    this.observer.disconnect();
  }
}
