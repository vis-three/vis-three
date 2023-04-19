import {
  AlwaysDepth,
  BufferGeometry,
  Float32BufferAttribute,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  Object3D,
} from "three";
import { VisHelper } from "../common";

export class LocalAxesHelper extends LineSegments implements VisHelper {
  target: Object3D;

  constructor(target: Object3D) {
    let size = 5;

    if ((target as Mesh).geometry) {
      const geometry = (target as Mesh).geometry;
      !geometry.boundingSphere && geometry.computeBoundingSphere();
      size = geometry.boundingSphere!.radius * 0.8;
    }

    // prettier-ignore
    const vertices = [
			0, 0, 0,	size, 0, 0,
			0, 0, 0,	0, size, 0,
			0, 0, 0,	0, 0, size
		];

    const colors = [
      // prittier-ignore
      1, 0, 0, 1, 0.6, 0,
      // prittier-ignore
      0, 1, 0, 0.6, 1, 0,
      // prittier-ignore
      0, 0, 1, 0, 0.6, 1,
    ];

    const geometry = new BufferGeometry();
    geometry.setAttribute("position", new Float32BufferAttribute(vertices, 3));
    geometry.setAttribute("color", new Float32BufferAttribute(colors, 3));

    const material = new LineBasicMaterial({
      vertexColors: true,
      toneMapped: false,
      depthFunc: AlwaysDepth,
    });

    super(geometry, material);

    this.target = target;
    this.matrixAutoUpdate = false;
    this.matrixWorldNeedsUpdate = false;
    this.matrix = target.matrix;
    this.matrixWorld = target.matrixWorld;
    this.renderOrder = 100;
    this.raycast = () => {};
  }
}
