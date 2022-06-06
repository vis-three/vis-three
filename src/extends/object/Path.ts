import {
  BufferGeometry,
  Line,
  Material,
  Points,
  PointsMaterial,
  Vector3,
} from "three";

export class Path extends Line {
  static anchorMaterial = new PointsMaterial({
    sizeAttenuation: false,
    size: 5,
  });

  type = "Path";
  anchors: Points[];
  constructor(anchors?: Vector3[], material?: Material | Material[]) {
    super(undefined, material);

    this.anchors = [];
  }

  addAnchor() {}

  removeAnchor() {}
}
