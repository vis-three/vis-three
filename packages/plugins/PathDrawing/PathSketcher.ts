import { EventDispatcher } from "@vis-three/core";
import {
  Mesh,
  MeshBasicMaterial,
  OrthographicCamera,
  Plane,
  PlaneBufferGeometry,
  Quaternion,
  Vector2,
  Vector3,
} from "three";

export interface Face {
  a: Vector3;
  b: Vector3;
  c: Vector3;
}

export class PathSketcher extends EventDispatcher {
  camera = new OrthographicCamera(
    -window.innerWidth,
    window.innerWidth,
    window.innerHeight,
    -window.innerHeight,
    0,
    10000
  );

  plane = new Plane(new Vector3(0, 0, 1), 0);

  helper = new Mesh(
    new PlaneBufferGeometry(150, 150),
    new MeshBasicMaterial({
      transparent: true,
      opacity: 0.2,
      color: "rgb(64, 255, 242)",
    })
  );

  constructor() {
    super();
    this.helper.raycast = () => {};
    this.helper.matrixAutoUpdate = false;
    this.setHelperMatrix();
  }

  offsetCamera(offset: Vector3) {
    offset
      .normalize()
      .applyQuaternion(
        new Quaternion().setFromUnitVectors(
          new Vector3(0, 1, 0),
          this.plane.normal
        )
      );

    this.camera.position
      .copy(this.plane.normal)
      .multiplyScalar(this.plane.constant)
      .add(offset);

    this.helper.position.add(offset);
    this.helper.updateMatrix();
    this.helper.updateMatrixWorld(true);
  }

  setDrawPlane(normal: Vector3, constant: number = 0) {
    this.plane.set(normal, constant);
    this.setHelperMatrix();
    return this;
  }

  setDrawPlaneByFace(face: Face): this {
    this.plane.setFromCoplanarPoints(face.a, face.b, face.c);
    this.setHelperMatrix();
    return this;
  }

  private setHelperMatrix() {
    const helper = this.helper;
    helper.position.copy(this.plane.normal).multiplyScalar(this.plane.constant);
    helper.applyQuaternion(
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        this.plane.normal
      )
    );
    helper.updateMatrix();
    helper.updateMatrixWorld(true);
  }

  dispose() {
    this.helper.removeFromParent();
    this.helper.geometry.dispose();
    this.helper.material.dispose();
  }
}
