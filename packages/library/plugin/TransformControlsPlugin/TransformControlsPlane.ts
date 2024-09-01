//

import {
  DoubleSide,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  Vector3,
} from "three";

export class TransformControlsPlane extends Mesh {
  camera!: PerspectiveCamera | OrthographicCamera;
  object?: Object3D;
  enabled = true;
  mode: "scale" | "position" | "rotation" = "position";
  space: "local" | "world" = "local";
  gizmo: any = {};
  picker: any = {};
  helper: any = {};
  axis = "XYZ";
  translationSnap = null;
  rotationSnap = null;
  scaleSnap = null;
  size = 1;
  dragging = false;
  showX = true;
  showY = true;
  showZ = true;
  worldPosition!: Vector3;
  worldPositionStart!: Vector3;
  worldQuaternion!: Quaternion;
  worldQuaternionStart!: Quaternion;
  cameraPosition!: Vector3;
  cameraQuaternion!: Quaternion;
  pointStart!: Vector3;
  pointEnd!: Vector3;
  rotationAxis!: Vector3;
  rotationAngle = 0;
  eye!: Vector3;

  _tempVector = new Vector3();
  _identityQuaternion = new Quaternion();
  _alignVector = new Vector3(0, 1, 0);
  _dirVector = new Vector3();
  _tempMatrix = new Matrix4();

  _unitX = new Vector3(1, 0, 0);
  _unitY = new Vector3(0, 1, 0);
  _unitZ = new Vector3(0, 0, 1);

  _v1 = new Vector3();
  _v2 = new Vector3();
  _v3 = new Vector3();

  constructor() {
    super(
      new PlaneGeometry(100000, 100000, 2, 2),
      new MeshBasicMaterial({
        visible: false,
        wireframe: true,
        side: DoubleSide,
        transparent: true,
        opacity: 0.1,
        toneMapped: false,
      })
    );

    //@ts-ignore
    this.type = "TransformControlsPlane";
  }

  updateMatrixWorld(force) {
    let space = this.space;

    this.position.copy(this.worldPosition);

    if (this.mode === "scale") space = "local"; // scale always oriented to local rotation

    this._v1
      .copy(this._unitX)
      .applyQuaternion(
        space === "local" ? this.worldQuaternion : this._identityQuaternion
      );
    this._v2
      .copy(this._unitY)
      .applyQuaternion(
        space === "local" ? this.worldQuaternion : this._identityQuaternion
      );
    this._v3
      .copy(this._unitZ)
      .applyQuaternion(
        space === "local" ? this.worldQuaternion : this._identityQuaternion
      );

    // Align the plane for current transform mode, axis and space.

    this._alignVector.copy(this._v2);

    switch (this.mode) {
      case "position":
      case "scale":
        switch (this.axis) {
          case "X":
            this._alignVector.copy(this.eye).cross(this._v1);
            this._dirVector.copy(this._v1).cross(this._alignVector);
            break;
          case "Y":
            this._alignVector.copy(this.eye).cross(this._v2);
            this._dirVector.copy(this._v2).cross(this._alignVector);
            break;
          case "Z":
            this._alignVector.copy(this.eye).cross(this._v3);
            this._dirVector.copy(this._v3).cross(this._alignVector);
            break;
          case "XY":
            this._dirVector.copy(this._v3);
            break;
          case "YZ":
            this._dirVector.copy(this._v1);
            break;
          case "XZ":
            this._alignVector.copy(this._v3);
            this._dirVector.copy(this._v2);
            break;
          case "XYZ":
          case "E":
            this._dirVector.set(0, 0, 0);
            break;
        }

        break;
      case "rotation":
      default:
        // special case for rotation
        this._dirVector.set(0, 0, 0);
    }

    if (this._dirVector.length() === 0) {
      // If in rotation mode, make the plane parallel to camera
      this.quaternion.copy(this.cameraQuaternion);
    } else {
      this._tempMatrix.lookAt(
        this._tempVector.set(0, 0, 0),
        this._dirVector,
        this._alignVector
      );

      this.quaternion.setFromRotationMatrix(this._tempMatrix);
    }

    super.updateMatrixWorld(force);
  }
}
