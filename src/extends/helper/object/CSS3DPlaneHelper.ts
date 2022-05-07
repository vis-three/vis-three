import {
  EdgesGeometry,
  Intersection,
  LineSegments,
  PlaneBufferGeometry,
  Raycaster,
} from "three";
import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import { getHelperLineMaterial, VisHelper } from "../common";

export class CSS3DPlaneHelper extends LineSegments implements VisHelper {
  target: CSS3DObject;
  // @ts-ignore
  type = "VisCSS3DPlaneHelper";

  constructor(target: CSS3DObject) {
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
}
