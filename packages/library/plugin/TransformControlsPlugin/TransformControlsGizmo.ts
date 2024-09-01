import {
  BoxGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Euler,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  OctahedronGeometry,
  OrthographicCamera,
  PerspectiveCamera,
  PlaneGeometry,
  Quaternion,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from "three";

export interface GizmoObject extends Object3D {
  tag: string;
  material: MeshBasicMaterial;
}

export interface CacheMaterial extends MeshBasicMaterial {
  _opacity: number;
  _color: Color;
  color: Color;
}

export class TransformControlsGizmo extends Object3D {
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
  _tempEuler = new Euler();
  _alignVector = new Vector3(0, 1, 0);
  _zeroVector = new Vector3(0, 0, 0);
  _lookAtMatrix = new Matrix4();
  _tempQuaternion = new Quaternion();
  _tempQuaternion2 = new Quaternion();

  _unitX = new Vector3(1, 0, 0);
  _unitY = new Vector3(0, 1, 0);
  _unitZ = new Vector3(0, 0, 1);

  constructor() {
    super();

    //@ts-ignore
    this.type = "TransformControlsGizmo";

    // shared materials

    const gizmoMaterial = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      side: DoubleSide,
      fog: false,
      toneMapped: false,
    });

    const gizmoLineMaterial = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      toneMapped: false,
    });

    // Make unique material for each axis/color

    const matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0.15;

    const matHelper = gizmoMaterial.clone();
    matHelper.opacity = 0.33;

    const matRed = gizmoMaterial.clone();
    matRed.color.set(0xff0000);

    const matGreen = gizmoMaterial.clone();
    matGreen.color.set(0x00ff00);

    const matBlue = gizmoMaterial.clone();
    matBlue.color.set(0x0000ff);

    const matWhiteTransparent = gizmoMaterial.clone();
    matWhiteTransparent.opacity = 0.25;

    const matYellowTransparent = matWhiteTransparent.clone();
    matYellowTransparent.color.set(0xffff00);

    const matCyanTransparent = matWhiteTransparent.clone();
    matCyanTransparent.color.set(0x00ffff);

    const matMagentaTransparent = matWhiteTransparent.clone();
    matMagentaTransparent.color.set(0xff00ff);

    const matYellow = gizmoMaterial.clone();
    matYellow.color.set(0xffff00);

    const matLineRed = gizmoLineMaterial.clone();
    matLineRed.color.set(0xff0000);

    const matLineGreen = gizmoLineMaterial.clone();
    matLineGreen.color.set(0x00ff00);

    const matLineBlue = gizmoLineMaterial.clone();
    matLineBlue.color.set(0x0000ff);

    const matLineCyan = gizmoLineMaterial.clone();
    matLineCyan.color.set(0x00ffff);

    const matLineMagenta = gizmoLineMaterial.clone();
    matLineMagenta.color.set(0xff00ff);

    const matLineYellow = gizmoLineMaterial.clone();
    matLineYellow.color.set(0xffff00);

    const matLineGray = gizmoLineMaterial.clone();
    matLineGray.color.set(0x787878);

    const matLineYellowTransparent = matLineYellow.clone();
    matLineYellowTransparent.opacity = 0.25;

    // reusable geometry

    const arrowGeometry = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false);

    const scaleHandleGeometry = new BoxGeometry(0.125, 0.125, 0.125);

    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
    );

    function CircleGeometry(radius: number, arc: number) {
      const geometry = new BufferGeometry();
      const vertices: number[] = [];

      for (let i = 0; i <= 64 * arc; ++i) {
        vertices.push(
          0,
          Math.cos((i / 32) * Math.PI) * radius,
          Math.sin((i / 32) * Math.PI) * radius
        );
      }

      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(vertices, 3)
      );

      return geometry;
    }

    // Special geometry for transform helper. If scaled with position vector it spans from [0,0,0] to position

    function TranslateHelperGeometry() {
      const geometry = new BufferGeometry();

      geometry.setAttribute(
        "position",
        new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
      );

      return geometry;
    }

    // Gizmo definitions - custom hierarchy definitions for setupGizmo() function

    const gizmoTranslate = {
      X: [
        [
          new Mesh(arrowGeometry, matRed),
          [1, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "fwd",
        ],
        [
          new Mesh(arrowGeometry, matRed),
          [1, 0, 0],
          [0, 0, Math.PI / 2],
          null,
          "bwd",
        ],
        [new Line(lineGeometry, matLineRed)],
      ],
      Y: [
        [new Mesh(arrowGeometry, matGreen), [0, 1, 0], null, null, "fwd"],
        [
          new Mesh(arrowGeometry, matGreen),
          [0, 1, 0],
          [Math.PI, 0, 0],
          null,
          "bwd",
        ],
        [new Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2]],
      ],
      Z: [
        [
          new Mesh(arrowGeometry, matBlue),
          [0, 0, 1],
          [Math.PI / 2, 0, 0],
          null,
          "fwd",
        ],
        [
          new Mesh(arrowGeometry, matBlue),
          [0, 0, 1],
          [-Math.PI / 2, 0, 0],
          null,
          "bwd",
        ],
        [new Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0]],
      ],
      XYZ: [
        [
          new Mesh(new OctahedronGeometry(0.1, 0), matWhiteTransparent.clone()),
          [0, 0, 0],
          [0, 0, 0],
        ],
      ],
      XY: [
        [
          new Mesh(
            new PlaneGeometry(0.295, 0.295),
            matYellowTransparent.clone()
          ),
          [0.15, 0.15, 0],
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.18, 0.3, 0],
          null,
          [0.125, 1, 1],
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.3, 0.18, 0],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1],
        ],
      ],
      YZ: [
        [
          new Mesh(new PlaneGeometry(0.295, 0.295), matCyanTransparent.clone()),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0],
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.18, 0.3],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1],
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.3, 0.18],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1],
        ],
      ],
      XZ: [
        [
          new Mesh(
            new PlaneGeometry(0.295, 0.295),
            matMagentaTransparent.clone()
          ),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0],
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.18, 0, 0.3],
          null,
          [0.125, 1, 1],
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.3, 0, 0.18],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1],
        ],
      ],
    };

    const pickerTranslate = {
      X: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible),
          [0.6, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
      ],
      Y: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible),
          [0, 0.6, 0],
        ],
      ],
      Z: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible),
          [0, 0, 0.6],
          [Math.PI / 2, 0, 0],
        ],
      ],
      XYZ: [[new Mesh(new OctahedronGeometry(0.2, 0), matInvisible)]],
      XY: [
        [new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible), [0.2, 0.2, 0]],
      ],
      YZ: [
        [
          new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible),
          [0, 0.2, 0.2],
          [0, Math.PI / 2, 0],
        ],
      ],
      XZ: [
        [
          new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible),
          [0.2, 0, 0.2],
          [-Math.PI / 2, 0, 0],
        ],
      ],
    };

    const helperTranslate = {
      START: [
        [
          new Mesh(new OctahedronGeometry(0.01, 2), matHelper),
          null,
          null,
          null,
          "helper",
        ],
      ],
      END: [
        [
          new Mesh(new OctahedronGeometry(0.01, 2), matHelper),
          null,
          null,
          null,
          "helper",
        ],
      ],
      DELTA: [
        [
          new Line(TranslateHelperGeometry(), matHelper),
          null,
          null,
          null,
          "helper",
        ],
      ],
      X: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    const gizmoRotate = {
      X: [
        [new Line(CircleGeometry(1, 0.5), matLineRed)],
        [
          new Mesh(new OctahedronGeometry(0.04, 0), matRed),
          [0, 0, 0.99],
          null,
          [1, 3, 1],
        ],
      ],
      Y: [
        [
          new Line(CircleGeometry(1, 0.5), matLineGreen),
          null,
          [0, 0, -Math.PI / 2],
        ],
        [
          new Mesh(new OctahedronGeometry(0.04, 0), matGreen),
          [0, 0, 0.99],
          null,
          [3, 1, 1],
        ],
      ],
      Z: [
        [
          new Line(CircleGeometry(1, 0.5), matLineBlue),
          null,
          [0, Math.PI / 2, 0],
        ],
        [
          new Mesh(new OctahedronGeometry(0.04, 0), matBlue),
          [0.99, 0, 0],
          null,
          [1, 3, 1],
        ],
      ],
      E: [
        [
          new Line(CircleGeometry(1.25, 1), matLineYellowTransparent),
          null,
          [0, Math.PI / 2, 0],
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [1.17, 0, 0],
          [0, 0, -Math.PI / 2],
          [1, 1, 0.001],
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [-1.17, 0, 0],
          [0, 0, Math.PI / 2],
          [1, 1, 0.001],
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [0, -1.17, 0],
          [Math.PI, 0, 0],
          [1, 1, 0.001],
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [0, 1.17, 0],
          [0, 0, 0],
          [1, 1, 0.001],
        ],
      ],
      XYZE: [
        [
          new Line(CircleGeometry(1, 1), matLineGray),
          null,
          [0, Math.PI / 2, 0],
        ],
      ],
    };

    const helperRotate = {
      AXIS: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    const pickerRotate = {
      X: [
        [
          new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible),
          [0, 0, 0],
          [0, -Math.PI / 2, -Math.PI / 2],
        ],
      ],
      Y: [
        [
          new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible),
          [0, 0, 0],
          [Math.PI / 2, 0, 0],
        ],
      ],
      Z: [
        [
          new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible),
          [0, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
      ],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), matInvisible)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), matInvisible)]],
    };

    const gizmoScale = {
      X: [
        [
          new Mesh(scaleHandleGeometry, matRed),
          [0.8, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
        [new Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]],
      ],
      Y: [
        [new Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]],
        [
          new Line(lineGeometry, matLineGreen),
          null,
          [0, 0, Math.PI / 2],
          [0.8, 1, 1],
        ],
      ],
      Z: [
        [
          new Mesh(scaleHandleGeometry, matBlue),
          [0, 0, 0.8],
          [Math.PI / 2, 0, 0],
        ],
        [
          new Line(lineGeometry, matLineBlue),
          null,
          [0, -Math.PI / 2, 0],
          [0.8, 1, 1],
        ],
      ],
      XY: [
        [
          new Mesh(scaleHandleGeometry, matYellowTransparent),
          [0.85, 0.85, 0],
          null,
          [2, 2, 0.2],
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.855, 0.98, 0],
          null,
          [0.125, 1, 1],
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.98, 0.855, 0],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1],
        ],
      ],
      YZ: [
        [
          new Mesh(scaleHandleGeometry, matCyanTransparent),
          [0, 0.85, 0.85],
          null,
          [0.2, 2, 2],
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.855, 0.98],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1],
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.98, 0.855],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1],
        ],
      ],
      XZ: [
        [
          new Mesh(scaleHandleGeometry, matMagentaTransparent),
          [0.85, 0, 0.85],
          null,
          [2, 0.2, 2],
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.855, 0, 0.98],
          null,
          [0.125, 1, 1],
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.98, 0, 0.855],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1],
        ],
      ],
      XYZX: [
        [
          new Mesh(
            new BoxGeometry(0.125, 0.125, 0.125),
            matWhiteTransparent.clone()
          ),
          [1.1, 0, 0],
        ],
      ],
      XYZY: [
        [
          new Mesh(
            new BoxGeometry(0.125, 0.125, 0.125),
            matWhiteTransparent.clone()
          ),
          [0, 1.1, 0],
        ],
      ],
      XYZZ: [
        [
          new Mesh(
            new BoxGeometry(0.125, 0.125, 0.125),
            matWhiteTransparent.clone()
          ),
          [0, 0, 1.1],
        ],
      ],
    };

    const pickerScale = {
      X: [
        [
          new Mesh(
            new CylinderGeometry(0.2, 0, 0.8, 4, 1, false),
            matInvisible
          ),
          [0.5, 0, 0],
          [0, 0, -Math.PI / 2],
        ],
      ],
      Y: [
        [
          new Mesh(
            new CylinderGeometry(0.2, 0, 0.8, 4, 1, false),
            matInvisible
          ),
          [0, 0.5, 0],
        ],
      ],
      Z: [
        [
          new Mesh(
            new CylinderGeometry(0.2, 0, 0.8, 4, 1, false),
            matInvisible
          ),
          [0, 0, 0.5],
          [Math.PI / 2, 0, 0],
        ],
      ],
      XY: [
        [
          new Mesh(scaleHandleGeometry, matInvisible),
          [0.85, 0.85, 0],
          null,
          [3, 3, 0.2],
        ],
      ],
      YZ: [
        [
          new Mesh(scaleHandleGeometry, matInvisible),
          [0, 0.85, 0.85],
          null,
          [0.2, 3, 3],
        ],
      ],
      XZ: [
        [
          new Mesh(scaleHandleGeometry, matInvisible),
          [0.85, 0, 0.85],
          null,
          [3, 0.2, 3],
        ],
      ],
      XYZX: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [1.1, 0, 0]],
      ],
      XYZY: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 1.1, 0]],
      ],
      XYZZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 1.1]],
      ],
    };

    const helperScale = {
      X: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Y: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper",
        ],
      ],
      Z: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper",
        ],
      ],
    };

    // Creates an Object3D with gizmos described in custom hierarchy definition.

    function setupGizmo(gizmoMap) {
      const gizmo = new Object3D();

      for (const name in gizmoMap) {
        for (let i = gizmoMap[name].length; i--; ) {
          const object = gizmoMap[name][i][0].clone();
          const position = gizmoMap[name][i][1];
          const rotation = gizmoMap[name][i][2];
          const scale = gizmoMap[name][i][3];
          const tag = gizmoMap[name][i][4];

          // name and tag properties are essential for picking and updating logic.
          object.name = name;
          object.tag = tag;

          if (position) {
            object.position.set(position[0], position[1], position[2]);
          }

          if (rotation) {
            object.rotation.set(rotation[0], rotation[1], rotation[2]);
          }

          if (scale) {
            object.scale.set(scale[0], scale[1], scale[2]);
          }

          object.updateMatrix();

          const tempGeometry = object.geometry.clone();
          tempGeometry.applyMatrix4(object.matrix);
          object.geometry = tempGeometry;
          object.renderOrder = Infinity;

          object.position.set(0, 0, 0);
          object.rotation.set(0, 0, 0);
          object.scale.set(1, 1, 1);

          gizmo.add(object);
        }
      }

      return gizmo;
    }

    // Gizmo creation

    this.gizmo = {};
    this.picker = {};
    this.helper = {};

    this.add((this.gizmo["position"] = setupGizmo(gizmoTranslate)));
    this.add((this.gizmo["rotation"] = setupGizmo(gizmoRotate)));
    this.add((this.gizmo["scale"] = setupGizmo(gizmoScale)));
    this.add((this.picker["position"] = setupGizmo(pickerTranslate)));
    this.add((this.picker["rotation"] = setupGizmo(pickerRotate)));
    this.add((this.picker["scale"] = setupGizmo(pickerScale)));
    this.add((this.helper["position"] = setupGizmo(helperTranslate)));
    this.add((this.helper["rotation"] = setupGizmo(helperRotate)));
    this.add((this.helper["scale"] = setupGizmo(helperScale)));

    // Pickers should be hidden always

    this.picker["position"].visible = false;
    this.picker["rotation"].visible = false;
    this.picker["scale"].visible = false;
  }

  // updateMatrixWorld will update transformations and appearance of individual handles

  updateMatrixWorld(force) {
    const space = this.mode === "scale" ? "local" : this.space; // scale always oriented to local rotation

    const quaternion =
      space === "local" ? this.worldQuaternion : this._identityQuaternion;

    // Show only gizmos for current transform mode

    this.gizmo["position"].visible = this.mode === "position";
    this.gizmo["rotation"].visible = this.mode === "rotation";
    this.gizmo["scale"].visible = this.mode === "scale";

    this.helper["position"].visible = this.mode === "position";
    this.helper["rotation"].visible = this.mode === "rotation";
    this.helper["scale"].visible = this.mode === "scale";

    let handles: GizmoObject[] = [];
    handles = handles.concat(this.picker[this.mode].children);
    handles = handles.concat(this.gizmo[this.mode].children);
    handles = handles.concat(this.helper[this.mode].children);

    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];

      // hide aligned to camera

      handle.visible = true;
      handle.rotation.set(0, 0, 0);
      handle.position.copy(this.worldPosition);

      let factor;

      if (this.camera instanceof OrthographicCamera) {
        factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
      } else {
        factor =
          this.worldPosition.distanceTo(this.cameraPosition) *
          Math.min(
            (1.9 * Math.tan((Math.PI * this.camera.fov) / 360)) /
              this.camera.zoom,
            7
          );
      }

      handle.scale.set(1, 1, 1).multiplyScalar((factor * this.size) / 7);

      // TODO: simplify helpers and consider decoupling from gizmo

      if (handle.tag === "helper") {
        handle.visible = false;

        if (handle.name === "AXIS") {
          handle.position.copy(this.worldPositionStart);
          handle.visible = !!this.axis;

          if (this.axis === "X") {
            this._tempQuaternion.setFromEuler(this._tempEuler.set(0, 0, 0));
            handle.quaternion.copy(quaternion).multiply(this._tempQuaternion);

            if (
              Math.abs(
                this._alignVector
                  .copy(this._unitX)
                  .applyQuaternion(quaternion)
                  .dot(this.eye)
              ) > 0.9
            ) {
              handle.visible = false;
            }
          }

          if (this.axis === "Y") {
            this._tempQuaternion.setFromEuler(
              this._tempEuler.set(0, 0, Math.PI / 2)
            );
            handle.quaternion.copy(quaternion).multiply(this._tempQuaternion);

            if (
              Math.abs(
                this._alignVector
                  .copy(this._unitY)
                  .applyQuaternion(quaternion)
                  .dot(this.eye)
              ) > 0.9
            ) {
              handle.visible = false;
            }
          }

          if (this.axis === "Z") {
            this._tempQuaternion.setFromEuler(
              this._tempEuler.set(0, Math.PI / 2, 0)
            );
            handle.quaternion.copy(quaternion).multiply(this._tempQuaternion);

            if (
              Math.abs(
                this._alignVector
                  .copy(this._unitZ)
                  .applyQuaternion(quaternion)
                  .dot(this.eye)
              ) > 0.9
            ) {
              handle.visible = false;
            }
          }

          if (this.axis === "XYZE") {
            this._tempQuaternion.setFromEuler(
              this._tempEuler.set(0, Math.PI / 2, 0)
            );
            this._alignVector.copy(this.rotationAxis);
            handle.quaternion.setFromRotationMatrix(
              this._lookAtMatrix.lookAt(
                this._zeroVector,
                this._alignVector,
                this._unitY
              )
            );
            handle.quaternion.multiply(this._tempQuaternion);
            handle.visible = this.dragging;
          }

          if (this.axis === "E") {
            handle.visible = false;
          }
        } else if (handle.name === "START") {
          handle.position.copy(this.worldPositionStart);
          handle.visible = this.dragging;
        } else if (handle.name === "END") {
          handle.position.copy(this.worldPosition);
          handle.visible = this.dragging;
        } else if (handle.name === "DELTA") {
          handle.position.copy(this.worldPositionStart);
          handle.quaternion.copy(this.worldQuaternionStart);
          this._tempVector
            .set(1e-10, 1e-10, 1e-10)
            .add(this.worldPositionStart)
            .sub(this.worldPosition)
            .multiplyScalar(-1);
          this._tempVector.applyQuaternion(
            this.worldQuaternionStart.clone().invert()
          );
          handle.scale.copy(this._tempVector);
          handle.visible = this.dragging;
        } else {
          handle.quaternion.copy(quaternion);

          if (this.dragging) {
            handle.position.copy(this.worldPositionStart);
          } else {
            handle.position.copy(this.worldPosition);
          }

          if (this.axis) {
            handle.visible = this.axis.search(handle.name) !== -1;
          }
        }

        // If updating helper, skip rest of the loop
        continue;
      }

      // Align handles to current local or world rotation

      handle.quaternion.copy(quaternion);

      if (this.mode === "position" || this.mode === "scale") {
        // Hide position and scale axis facing the camera

        const AXIS_HIDE_TRESHOLD = 0.99;
        const PLANE_HIDE_TRESHOLD = 0.2;
        const AXIS_FLIP_TRESHOLD = 0.0;

        if (handle.name === "X" || handle.name === "XYZX") {
          if (
            Math.abs(
              this._alignVector
                .copy(this._unitX)
                .applyQuaternion(quaternion)
                .dot(this.eye)
            ) > AXIS_HIDE_TRESHOLD
          ) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === "Y" || handle.name === "XYZY") {
          if (
            Math.abs(
              this._alignVector
                .copy(this._unitY)
                .applyQuaternion(quaternion)
                .dot(this.eye)
            ) > AXIS_HIDE_TRESHOLD
          ) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === "Z" || handle.name === "XYZZ") {
          if (
            Math.abs(
              this._alignVector
                .copy(this._unitZ)
                .applyQuaternion(quaternion)
                .dot(this.eye)
            ) > AXIS_HIDE_TRESHOLD
          ) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === "XY") {
          if (
            Math.abs(
              this._alignVector
                .copy(this._unitZ)
                .applyQuaternion(quaternion)
                .dot(this.eye)
            ) < PLANE_HIDE_TRESHOLD
          ) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === "YZ") {
          if (
            Math.abs(
              this._alignVector
                .copy(this._unitX)
                .applyQuaternion(quaternion)
                .dot(this.eye)
            ) < PLANE_HIDE_TRESHOLD
          ) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        if (handle.name === "XZ") {
          if (
            Math.abs(
              this._alignVector
                .copy(this._unitY)
                .applyQuaternion(quaternion)
                .dot(this.eye)
            ) < PLANE_HIDE_TRESHOLD
          ) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }

        // Flip position and scale axis ocluded behind another axis

        if (handle.name.search("X") !== -1) {
          if (
            this._alignVector
              .copy(this._unitX)
              .applyQuaternion(quaternion)
              .dot(this.eye) < AXIS_FLIP_TRESHOLD
          ) {
            if (handle.tag === "fwd") {
              handle.visible = false;
            } else {
              handle.scale.x *= -1;
            }
          } else if (handle.tag === "bwd") {
            handle.visible = false;
          }
        }

        if (handle.name.search("Y") !== -1) {
          if (
            this._alignVector
              .copy(this._unitY)
              .applyQuaternion(quaternion)
              .dot(this.eye) < AXIS_FLIP_TRESHOLD
          ) {
            if (handle.tag === "fwd") {
              handle.visible = false;
            } else {
              handle.scale.y *= -1;
            }
          } else if (handle.tag === "bwd") {
            handle.visible = false;
          }
        }

        if (handle.name.search("Z") !== -1) {
          if (
            this._alignVector
              .copy(this._unitZ)
              .applyQuaternion(quaternion)
              .dot(this.eye) < AXIS_FLIP_TRESHOLD
          ) {
            if (handle.tag === "fwd") {
              handle.visible = false;
            } else {
              handle.scale.z *= -1;
            }
          } else if (handle.tag === "bwd") {
            handle.visible = false;
          }
        }
      } else if (this.mode === "rotation") {
        // Align handles to current local or world rotation

        this._tempQuaternion2.copy(quaternion);
        this._alignVector
          .copy(this.eye)
          .applyQuaternion(this._tempQuaternion.copy(quaternion).invert());

        if (handle.name.search("E") !== -1) {
          handle.quaternion.setFromRotationMatrix(
            this._lookAtMatrix.lookAt(this.eye, this._zeroVector, this._unitY)
          );
        }

        if (handle.name === "X") {
          this._tempQuaternion.setFromAxisAngle(
            this._unitX,
            Math.atan2(-this._alignVector.y, this._alignVector.z)
          );
          this._tempQuaternion.multiplyQuaternions(
            this._tempQuaternion2,
            this._tempQuaternion
          );
          handle.quaternion.copy(this._tempQuaternion);
        }

        if (handle.name === "Y") {
          this._tempQuaternion.setFromAxisAngle(
            this._unitY,
            Math.atan2(this._alignVector.x, this._alignVector.z)
          );
          this._tempQuaternion.multiplyQuaternions(
            this._tempQuaternion2,
            this._tempQuaternion
          );
          handle.quaternion.copy(this._tempQuaternion);
        }

        if (handle.name === "Z") {
          this._tempQuaternion.setFromAxisAngle(
            this._unitZ,
            Math.atan2(this._alignVector.y, this._alignVector.x)
          );
          this._tempQuaternion.multiplyQuaternions(
            this._tempQuaternion2,
            this._tempQuaternion
          );
          handle.quaternion.copy(this._tempQuaternion);
        }
      }

      // Hide disabled axes
      handle.visible =
        handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
      handle.visible =
        handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
      handle.visible =
        handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
      handle.visible =
        handle.visible &&
        (handle.name.indexOf("E") === -1 ||
          (this.showX && this.showY && this.showZ));

      // highlight selected axis

      (<CacheMaterial>handle.material)._opacity =
        (<CacheMaterial>handle.material)._opacity || handle.material.opacity;
      (<CacheMaterial>handle.material)._color =
        (<CacheMaterial>handle.material)._color ||
        handle.material.color.clone();

      handle.material.color.copy((<CacheMaterial>handle.material)._color);
      handle.material.opacity = (<CacheMaterial>handle.material)._opacity;

      if (!this.enabled) {
        handle.material.opacity *= 0.5;
        handle.material.color.lerp(new Color(1, 1, 1), 0.5);
      } else if (this.axis) {
        if (handle.name === this.axis) {
          handle.material.opacity = 1.0;
          handle.material.color.lerp(new Color(1, 1, 1), 0.5);
        } else if (
          this.axis.split("").some(function (a) {
            return handle.name === a;
          })
        ) {
          handle.material.opacity = 1.0;
          handle.material.color.lerp(new Color(1, 1, 1), 0.5);
        } else {
          handle.material.opacity *= 0.25;
          handle.material.color.lerp(new Color(1, 1, 1), 0.5);
        }
      }
    }

    super.updateMatrixWorld(force);
  }
}
