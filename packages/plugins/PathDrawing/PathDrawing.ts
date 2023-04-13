import { EventDispatcher } from "@vis-three/core";
import { OrthographicCamera, Plane, Vector2, Vector3 } from "three";

export class PathDrawing extends EventDispatcher {
  camera = new OrthographicCamera(
    -window.innerWidth,
    window.innerWidth,
    window.innerHeight,
    -window.innerHeight,
    0,
    10000
  );

  plane = new Plane(new Vector3(0, 0, 1), 0);
  up = new Vector3(0, 1, 0);

  constructor() {
    super();
  }

  calcPosition(offset: Vector3, result?: Vector3) {
    !result && (result = new Vector3());
    result
      .copy(this.plane.normal)
      .multiplyScalar(this.plane.constant)
      .add(offset.applyAxisAngle(this.up, offset.angleTo(this.plane.normal)));
  }

  setDrawPlane(normal: Vector3, constant: number = 0) {
    this.plane.set(normal, constant);
    return this;
  }
}
