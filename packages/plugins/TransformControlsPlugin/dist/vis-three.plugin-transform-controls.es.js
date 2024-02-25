import { transPkgName } from "@vis-three/utils";
import { ENGINE_EVENT } from "@vis-three/core";
import { Object3D, Vector3, Quaternion, Euler, Matrix4, MeshBasicMaterial, DoubleSide, LineBasicMaterial, CylinderGeometry, BoxGeometry, BufferGeometry, Float32BufferAttribute, Mesh, Line, OctahedronGeometry, PlaneGeometry, TorusGeometry, SphereGeometry, OrthographicCamera, Color, Raycaster } from "three";
const name = "@vis-three/plugin-transform-controls";
class TransformControlsGizmo extends Object3D {
  constructor() {
    super();
    this.enabled = true;
    this.mode = "position";
    this.space = "local";
    this.gizmo = {};
    this.picker = {};
    this.helper = {};
    this.axis = "XYZ";
    this.translationSnap = null;
    this.rotationSnap = null;
    this.scaleSnap = null;
    this.size = 1;
    this.dragging = false;
    this.showX = true;
    this.showY = true;
    this.showZ = true;
    this.rotationAngle = 0;
    this._tempVector = new Vector3();
    this._identityQuaternion = new Quaternion();
    this._tempEuler = new Euler();
    this._alignVector = new Vector3(0, 1, 0);
    this._zeroVector = new Vector3(0, 0, 0);
    this._lookAtMatrix = new Matrix4();
    this._tempQuaternion = new Quaternion();
    this._tempQuaternion2 = new Quaternion();
    this._unitX = new Vector3(1, 0, 0);
    this._unitY = new Vector3(0, 1, 0);
    this._unitZ = new Vector3(0, 0, 1);
    this.type = "TransformControlsGizmo";
    const gizmoMaterial = new MeshBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      side: DoubleSide,
      fog: false,
      toneMapped: false
    });
    const gizmoLineMaterial = new LineBasicMaterial({
      depthTest: false,
      depthWrite: false,
      transparent: true,
      linewidth: 1,
      toneMapped: false
    });
    const matInvisible = gizmoMaterial.clone();
    matInvisible.opacity = 0.15;
    const matHelper = gizmoMaterial.clone();
    matHelper.opacity = 0.33;
    const matRed = gizmoMaterial.clone();
    matRed.color.set(16711680);
    const matGreen = gizmoMaterial.clone();
    matGreen.color.set(65280);
    const matBlue = gizmoMaterial.clone();
    matBlue.color.set(255);
    const matWhiteTransparent = gizmoMaterial.clone();
    matWhiteTransparent.opacity = 0.25;
    const matYellowTransparent = matWhiteTransparent.clone();
    matYellowTransparent.color.set(16776960);
    const matCyanTransparent = matWhiteTransparent.clone();
    matCyanTransparent.color.set(65535);
    const matMagentaTransparent = matWhiteTransparent.clone();
    matMagentaTransparent.color.set(16711935);
    const matYellow = gizmoMaterial.clone();
    matYellow.color.set(16776960);
    const matLineRed = gizmoLineMaterial.clone();
    matLineRed.color.set(16711680);
    const matLineGreen = gizmoLineMaterial.clone();
    matLineGreen.color.set(65280);
    const matLineBlue = gizmoLineMaterial.clone();
    matLineBlue.color.set(255);
    const matLineCyan = gizmoLineMaterial.clone();
    matLineCyan.color.set(65535);
    const matLineMagenta = gizmoLineMaterial.clone();
    matLineMagenta.color.set(16711935);
    const matLineYellow = gizmoLineMaterial.clone();
    matLineYellow.color.set(16776960);
    const matLineGray = gizmoLineMaterial.clone();
    matLineGray.color.set(7895160);
    const matLineYellowTransparent = matLineYellow.clone();
    matLineYellowTransparent.opacity = 0.25;
    const arrowGeometry = new CylinderGeometry(0, 0.05, 0.2, 12, 1, false);
    const scaleHandleGeometry = new BoxGeometry(0.125, 0.125, 0.125);
    const lineGeometry = new BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new Float32BufferAttribute([0, 0, 0, 1, 0, 0], 3)
    );
    function CircleGeometry(radius, arc) {
      const geometry = new BufferGeometry();
      const vertices = [];
      for (let i = 0; i <= 64 * arc; ++i) {
        vertices.push(
          0,
          Math.cos(i / 32 * Math.PI) * radius,
          Math.sin(i / 32 * Math.PI) * radius
        );
      }
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute(vertices, 3)
      );
      return geometry;
    }
    function TranslateHelperGeometry() {
      const geometry = new BufferGeometry();
      geometry.setAttribute(
        "position",
        new Float32BufferAttribute([0, 0, 0, 1, 1, 1], 3)
      );
      return geometry;
    }
    const gizmoTranslate = {
      X: [
        [
          new Mesh(arrowGeometry, matRed),
          [1, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "fwd"
        ],
        [
          new Mesh(arrowGeometry, matRed),
          [1, 0, 0],
          [0, 0, Math.PI / 2],
          null,
          "bwd"
        ],
        [new Line(lineGeometry, matLineRed)]
      ],
      Y: [
        [new Mesh(arrowGeometry, matGreen), [0, 1, 0], null, null, "fwd"],
        [
          new Mesh(arrowGeometry, matGreen),
          [0, 1, 0],
          [Math.PI, 0, 0],
          null,
          "bwd"
        ],
        [new Line(lineGeometry, matLineGreen), null, [0, 0, Math.PI / 2]]
      ],
      Z: [
        [
          new Mesh(arrowGeometry, matBlue),
          [0, 0, 1],
          [Math.PI / 2, 0, 0],
          null,
          "fwd"
        ],
        [
          new Mesh(arrowGeometry, matBlue),
          [0, 0, 1],
          [-Math.PI / 2, 0, 0],
          null,
          "bwd"
        ],
        [new Line(lineGeometry, matLineBlue), null, [0, -Math.PI / 2, 0]]
      ],
      XYZ: [
        [
          new Mesh(new OctahedronGeometry(0.1, 0), matWhiteTransparent.clone()),
          [0, 0, 0],
          [0, 0, 0]
        ]
      ],
      XY: [
        [
          new Mesh(
            new PlaneGeometry(0.295, 0.295),
            matYellowTransparent.clone()
          ),
          [0.15, 0.15, 0]
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.18, 0.3, 0],
          null,
          [0.125, 1, 1]
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.3, 0.18, 0],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ]
      ],
      YZ: [
        [
          new Mesh(new PlaneGeometry(0.295, 0.295), matCyanTransparent.clone()),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0]
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.18, 0.3],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.3, 0.18],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ],
      XZ: [
        [
          new Mesh(
            new PlaneGeometry(0.295, 0.295),
            matMagentaTransparent.clone()
          ),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0]
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.18, 0, 0.3],
          null,
          [0.125, 1, 1]
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.3, 0, 0.18],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ]
    };
    const pickerTranslate = {
      X: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible),
          [0.6, 0, 0],
          [0, 0, -Math.PI / 2]
        ]
      ],
      Y: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible),
          [0, 0.6, 0]
        ]
      ],
      Z: [
        [
          new Mesh(new CylinderGeometry(0.2, 0, 1, 4, 1, false), matInvisible),
          [0, 0, 0.6],
          [Math.PI / 2, 0, 0]
        ]
      ],
      XYZ: [[new Mesh(new OctahedronGeometry(0.2, 0), matInvisible)]],
      XY: [
        [new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible), [0.2, 0.2, 0]]
      ],
      YZ: [
        [
          new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible),
          [0, 0.2, 0.2],
          [0, Math.PI / 2, 0]
        ]
      ],
      XZ: [
        [
          new Mesh(new PlaneGeometry(0.4, 0.4), matInvisible),
          [0.2, 0, 0.2],
          [-Math.PI / 2, 0, 0]
        ]
      ]
    };
    const helperTranslate = {
      START: [
        [
          new Mesh(new OctahedronGeometry(0.01, 2), matHelper),
          null,
          null,
          null,
          "helper"
        ]
      ],
      END: [
        [
          new Mesh(new OctahedronGeometry(0.01, 2), matHelper),
          null,
          null,
          null,
          "helper"
        ]
      ],
      DELTA: [
        [
          new Line(TranslateHelperGeometry(), matHelper),
          null,
          null,
          null,
          "helper"
        ]
      ],
      X: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Y: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Z: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper"
        ]
      ]
    };
    const gizmoRotate = {
      X: [
        [new Line(CircleGeometry(1, 0.5), matLineRed)],
        [
          new Mesh(new OctahedronGeometry(0.04, 0), matRed),
          [0, 0, 0.99],
          null,
          [1, 3, 1]
        ]
      ],
      Y: [
        [
          new Line(CircleGeometry(1, 0.5), matLineGreen),
          null,
          [0, 0, -Math.PI / 2]
        ],
        [
          new Mesh(new OctahedronGeometry(0.04, 0), matGreen),
          [0, 0, 0.99],
          null,
          [3, 1, 1]
        ]
      ],
      Z: [
        [
          new Line(CircleGeometry(1, 0.5), matLineBlue),
          null,
          [0, Math.PI / 2, 0]
        ],
        [
          new Mesh(new OctahedronGeometry(0.04, 0), matBlue),
          [0.99, 0, 0],
          null,
          [1, 3, 1]
        ]
      ],
      E: [
        [
          new Line(CircleGeometry(1.25, 1), matLineYellowTransparent),
          null,
          [0, Math.PI / 2, 0]
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [1.17, 0, 0],
          [0, 0, -Math.PI / 2],
          [1, 1, 1e-3]
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [-1.17, 0, 0],
          [0, 0, Math.PI / 2],
          [1, 1, 1e-3]
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [0, -1.17, 0],
          [Math.PI, 0, 0],
          [1, 1, 1e-3]
        ],
        [
          new Mesh(
            new CylinderGeometry(0.03, 0, 0.15, 4, 1, false),
            matLineYellowTransparent
          ),
          [0, 1.17, 0],
          [0, 0, 0],
          [1, 1, 1e-3]
        ]
      ],
      XYZE: [
        [
          new Line(CircleGeometry(1, 1), matLineGray),
          null,
          [0, Math.PI / 2, 0]
        ]
      ]
    };
    const helperRotate = {
      AXIS: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper"
        ]
      ]
    };
    const pickerRotate = {
      X: [
        [
          new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible),
          [0, 0, 0],
          [0, -Math.PI / 2, -Math.PI / 2]
        ]
      ],
      Y: [
        [
          new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible),
          [0, 0, 0],
          [Math.PI / 2, 0, 0]
        ]
      ],
      Z: [
        [
          new Mesh(new TorusGeometry(1, 0.1, 4, 24), matInvisible),
          [0, 0, 0],
          [0, 0, -Math.PI / 2]
        ]
      ],
      E: [[new Mesh(new TorusGeometry(1.25, 0.1, 2, 24), matInvisible)]],
      XYZE: [[new Mesh(new SphereGeometry(0.7, 10, 8), matInvisible)]]
    };
    const gizmoScale = {
      X: [
        [
          new Mesh(scaleHandleGeometry, matRed),
          [0.8, 0, 0],
          [0, 0, -Math.PI / 2]
        ],
        [new Line(lineGeometry, matLineRed), null, null, [0.8, 1, 1]]
      ],
      Y: [
        [new Mesh(scaleHandleGeometry, matGreen), [0, 0.8, 0]],
        [
          new Line(lineGeometry, matLineGreen),
          null,
          [0, 0, Math.PI / 2],
          [0.8, 1, 1]
        ]
      ],
      Z: [
        [
          new Mesh(scaleHandleGeometry, matBlue),
          [0, 0, 0.8],
          [Math.PI / 2, 0, 0]
        ],
        [
          new Line(lineGeometry, matLineBlue),
          null,
          [0, -Math.PI / 2, 0],
          [0.8, 1, 1]
        ]
      ],
      XY: [
        [
          new Mesh(scaleHandleGeometry, matYellowTransparent),
          [0.85, 0.85, 0],
          null,
          [2, 2, 0.2]
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.855, 0.98, 0],
          null,
          [0.125, 1, 1]
        ],
        [
          new Line(lineGeometry, matLineYellow),
          [0.98, 0.855, 0],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ]
      ],
      YZ: [
        [
          new Mesh(scaleHandleGeometry, matCyanTransparent),
          [0, 0.85, 0.85],
          null,
          [0.2, 2, 2]
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.855, 0.98],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ],
        [
          new Line(lineGeometry, matLineCyan),
          [0, 0.98, 0.855],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ],
      XZ: [
        [
          new Mesh(scaleHandleGeometry, matMagentaTransparent),
          [0.85, 0, 0.85],
          null,
          [2, 0.2, 2]
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.855, 0, 0.98],
          null,
          [0.125, 1, 1]
        ],
        [
          new Line(lineGeometry, matLineMagenta),
          [0.98, 0, 0.855],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ],
      XYZX: [
        [
          new Mesh(
            new BoxGeometry(0.125, 0.125, 0.125),
            matWhiteTransparent.clone()
          ),
          [1.1, 0, 0]
        ]
      ],
      XYZY: [
        [
          new Mesh(
            new BoxGeometry(0.125, 0.125, 0.125),
            matWhiteTransparent.clone()
          ),
          [0, 1.1, 0]
        ]
      ],
      XYZZ: [
        [
          new Mesh(
            new BoxGeometry(0.125, 0.125, 0.125),
            matWhiteTransparent.clone()
          ),
          [0, 0, 1.1]
        ]
      ]
    };
    const pickerScale = {
      X: [
        [
          new Mesh(
            new CylinderGeometry(0.2, 0, 0.8, 4, 1, false),
            matInvisible
          ),
          [0.5, 0, 0],
          [0, 0, -Math.PI / 2]
        ]
      ],
      Y: [
        [
          new Mesh(
            new CylinderGeometry(0.2, 0, 0.8, 4, 1, false),
            matInvisible
          ),
          [0, 0.5, 0]
        ]
      ],
      Z: [
        [
          new Mesh(
            new CylinderGeometry(0.2, 0, 0.8, 4, 1, false),
            matInvisible
          ),
          [0, 0, 0.5],
          [Math.PI / 2, 0, 0]
        ]
      ],
      XY: [
        [
          new Mesh(scaleHandleGeometry, matInvisible),
          [0.85, 0.85, 0],
          null,
          [3, 3, 0.2]
        ]
      ],
      YZ: [
        [
          new Mesh(scaleHandleGeometry, matInvisible),
          [0, 0.85, 0.85],
          null,
          [0.2, 3, 3]
        ]
      ],
      XZ: [
        [
          new Mesh(scaleHandleGeometry, matInvisible),
          [0.85, 0, 0.85],
          null,
          [3, 0.2, 3]
        ]
      ],
      XYZX: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [1.1, 0, 0]]
      ],
      XYZY: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 1.1, 0]]
      ],
      XYZZ: [
        [new Mesh(new BoxGeometry(0.2, 0.2, 0.2), matInvisible), [0, 0, 1.1]]
      ]
    };
    const helperScale = {
      X: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Y: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Z: [
        [
          new Line(lineGeometry, matHelper.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper"
        ]
      ]
    };
    function setupGizmo(gizmoMap) {
      const gizmo = new Object3D();
      for (const name2 in gizmoMap) {
        for (let i = gizmoMap[name2].length; i--; ) {
          const object = gizmoMap[name2][i][0].clone();
          const position = gizmoMap[name2][i][1];
          const rotation = gizmoMap[name2][i][2];
          const scale = gizmoMap[name2][i][3];
          const tag = gizmoMap[name2][i][4];
          object.name = name2;
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
    this.gizmo = {};
    this.picker = {};
    this.helper = {};
    this.add(this.gizmo["position"] = setupGizmo(gizmoTranslate));
    this.add(this.gizmo["rotation"] = setupGizmo(gizmoRotate));
    this.add(this.gizmo["scale"] = setupGizmo(gizmoScale));
    this.add(this.picker["position"] = setupGizmo(pickerTranslate));
    this.add(this.picker["rotation"] = setupGizmo(pickerRotate));
    this.add(this.picker["scale"] = setupGizmo(pickerScale));
    this.add(this.helper["position"] = setupGizmo(helperTranslate));
    this.add(this.helper["rotation"] = setupGizmo(helperRotate));
    this.add(this.helper["scale"] = setupGizmo(helperScale));
    this.picker["position"].visible = false;
    this.picker["rotation"].visible = false;
    this.picker["scale"].visible = false;
  }
  updateMatrixWorld(force) {
    const space = this.mode === "scale" ? "local" : this.space;
    const quaternion = space === "local" ? this.worldQuaternion : this._identityQuaternion;
    this.gizmo["position"].visible = this.mode === "position";
    this.gizmo["rotation"].visible = this.mode === "rotation";
    this.gizmo["scale"].visible = this.mode === "scale";
    this.helper["position"].visible = this.mode === "position";
    this.helper["rotation"].visible = this.mode === "rotation";
    this.helper["scale"].visible = this.mode === "scale";
    let handles = [];
    handles = handles.concat(this.picker[this.mode].children);
    handles = handles.concat(this.gizmo[this.mode].children);
    handles = handles.concat(this.helper[this.mode].children);
    for (let i = 0; i < handles.length; i++) {
      const handle = handles[i];
      handle.visible = true;
      handle.rotation.set(0, 0, 0);
      handle.position.copy(this.worldPosition);
      let factor;
      if (this.camera instanceof OrthographicCamera) {
        factor = (this.camera.top - this.camera.bottom) / this.camera.zoom;
      } else {
        factor = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(
          1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom,
          7
        );
      }
      handle.scale.set(1, 1, 1).multiplyScalar(factor * this.size / 7);
      if (handle.tag === "helper") {
        handle.visible = false;
        if (handle.name === "AXIS") {
          handle.position.copy(this.worldPositionStart);
          handle.visible = !!this.axis;
          if (this.axis === "X") {
            this._tempQuaternion.setFromEuler(this._tempEuler.set(0, 0, 0));
            handle.quaternion.copy(quaternion).multiply(this._tempQuaternion);
            if (Math.abs(
              this._alignVector.copy(this._unitX).applyQuaternion(quaternion).dot(this.eye)
            ) > 0.9) {
              handle.visible = false;
            }
          }
          if (this.axis === "Y") {
            this._tempQuaternion.setFromEuler(
              this._tempEuler.set(0, 0, Math.PI / 2)
            );
            handle.quaternion.copy(quaternion).multiply(this._tempQuaternion);
            if (Math.abs(
              this._alignVector.copy(this._unitY).applyQuaternion(quaternion).dot(this.eye)
            ) > 0.9) {
              handle.visible = false;
            }
          }
          if (this.axis === "Z") {
            this._tempQuaternion.setFromEuler(
              this._tempEuler.set(0, Math.PI / 2, 0)
            );
            handle.quaternion.copy(quaternion).multiply(this._tempQuaternion);
            if (Math.abs(
              this._alignVector.copy(this._unitZ).applyQuaternion(quaternion).dot(this.eye)
            ) > 0.9) {
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
          this._tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1);
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
        continue;
      }
      handle.quaternion.copy(quaternion);
      if (this.mode === "position" || this.mode === "scale") {
        const AXIS_HIDE_TRESHOLD = 0.99;
        const PLANE_HIDE_TRESHOLD = 0.2;
        const AXIS_FLIP_TRESHOLD = 0;
        if (handle.name === "X" || handle.name === "XYZX") {
          if (Math.abs(
            this._alignVector.copy(this._unitX).applyQuaternion(quaternion).dot(this.eye)
          ) > AXIS_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "Y" || handle.name === "XYZY") {
          if (Math.abs(
            this._alignVector.copy(this._unitY).applyQuaternion(quaternion).dot(this.eye)
          ) > AXIS_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "Z" || handle.name === "XYZZ") {
          if (Math.abs(
            this._alignVector.copy(this._unitZ).applyQuaternion(quaternion).dot(this.eye)
          ) > AXIS_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "XY") {
          if (Math.abs(
            this._alignVector.copy(this._unitZ).applyQuaternion(quaternion).dot(this.eye)
          ) < PLANE_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "YZ") {
          if (Math.abs(
            this._alignVector.copy(this._unitX).applyQuaternion(quaternion).dot(this.eye)
          ) < PLANE_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name === "XZ") {
          if (Math.abs(
            this._alignVector.copy(this._unitY).applyQuaternion(quaternion).dot(this.eye)
          ) < PLANE_HIDE_TRESHOLD) {
            handle.scale.set(1e-10, 1e-10, 1e-10);
            handle.visible = false;
          }
        }
        if (handle.name.search("X") !== -1) {
          if (this._alignVector.copy(this._unitX).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
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
          if (this._alignVector.copy(this._unitY).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
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
          if (this._alignVector.copy(this._unitZ).applyQuaternion(quaternion).dot(this.eye) < AXIS_FLIP_TRESHOLD) {
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
        this._tempQuaternion2.copy(quaternion);
        this._alignVector.copy(this.eye).applyQuaternion(this._tempQuaternion.copy(quaternion).invert());
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
      handle.visible = handle.visible && (handle.name.indexOf("X") === -1 || this.showX);
      handle.visible = handle.visible && (handle.name.indexOf("Y") === -1 || this.showY);
      handle.visible = handle.visible && (handle.name.indexOf("Z") === -1 || this.showZ);
      handle.visible = handle.visible && (handle.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ);
      handle.material._opacity = handle.material._opacity || handle.material.opacity;
      handle.material._color = handle.material._color || handle.material.color.clone();
      handle.material.color.copy(handle.material._color);
      handle.material.opacity = handle.material._opacity;
      if (!this.enabled) {
        handle.material.opacity *= 0.5;
        handle.material.color.lerp(new Color(1, 1, 1), 0.5);
      } else if (this.axis) {
        if (handle.name === this.axis) {
          handle.material.opacity = 1;
          handle.material.color.lerp(new Color(1, 1, 1), 0.5);
        } else if (this.axis.split("").some(function(a) {
          return handle.name === a;
        })) {
          handle.material.opacity = 1;
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
class TransformControlsPlane extends Mesh {
  constructor() {
    super(
      new PlaneGeometry(1e5, 1e5, 2, 2),
      new MeshBasicMaterial({
        visible: false,
        wireframe: true,
        side: DoubleSide,
        transparent: true,
        opacity: 0.1,
        toneMapped: false
      })
    );
    this.enabled = true;
    this.mode = "position";
    this.space = "local";
    this.gizmo = {};
    this.picker = {};
    this.helper = {};
    this.axis = "XYZ";
    this.translationSnap = null;
    this.rotationSnap = null;
    this.scaleSnap = null;
    this.size = 1;
    this.dragging = false;
    this.showX = true;
    this.showY = true;
    this.showZ = true;
    this.rotationAngle = 0;
    this._tempVector = new Vector3();
    this._identityQuaternion = new Quaternion();
    this._alignVector = new Vector3(0, 1, 0);
    this._dirVector = new Vector3();
    this._tempMatrix = new Matrix4();
    this._unitX = new Vector3(1, 0, 0);
    this._unitY = new Vector3(0, 1, 0);
    this._unitZ = new Vector3(0, 0, 1);
    this._v1 = new Vector3();
    this._v2 = new Vector3();
    this._v3 = new Vector3();
    this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(force) {
    let space = this.space;
    this.position.copy(this.worldPosition);
    if (this.mode === "scale")
      space = "local";
    this._v1.copy(this._unitX).applyQuaternion(
      space === "local" ? this.worldQuaternion : this._identityQuaternion
    );
    this._v2.copy(this._unitY).applyQuaternion(
      space === "local" ? this.worldQuaternion : this._identityQuaternion
    );
    this._v3.copy(this._unitZ).applyQuaternion(
      space === "local" ? this.worldQuaternion : this._identityQuaternion
    );
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
        this._dirVector.set(0, 0, 0);
    }
    if (this._dirVector.length() === 0) {
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
var TRANSFORM_EVENT = /* @__PURE__ */ ((TRANSFORM_EVENT2) => {
  TRANSFORM_EVENT2["HOVER"] = "hover";
  TRANSFORM_EVENT2["CHANGE"] = "change";
  TRANSFORM_EVENT2["MOUSE_DOWN"] = "mouseDown";
  TRANSFORM_EVENT2["OBJECT_CHANGE"] = "objectChange";
  TRANSFORM_EVENT2["MOUSE_UP"] = "mouseUp";
  return TRANSFORM_EVENT2;
})(TRANSFORM_EVENT || {});
class TransformControls extends Object3D {
  constructor(camera, domElement, scene) {
    super();
    this.object = new Object3D();
    this.enabled = true;
    this.mode = "position";
    this.space = "local";
    this.axis = "XYZ";
    this.translationSnap = 0;
    this.rotationSnap = 0;
    this.scaleSnap = 0;
    this.size = 1;
    this.dragging = false;
    this.showX = true;
    this.showY = true;
    this.showZ = true;
    this.cacheScene = null;
    this.transObjectSet = /* @__PURE__ */ new Set();
    this.cacheObjects = /* @__PURE__ */ new Map();
    this.rotationAngle = 0;
    this._raycaster = new Raycaster();
    this._offset = new Vector3();
    this._startNorm = new Vector3();
    this._endNorm = new Vector3();
    this._cameraScale = new Vector3();
    this._parentPosition = new Vector3();
    this._parentQuaternion = new Quaternion();
    this._parentQuaternionInv = new Quaternion();
    this._parentScale = new Vector3();
    this._worldScaleStart = new Vector3();
    this._worldQuaternionInv = new Quaternion();
    this._worldScale = new Vector3();
    this._positionStart = new Vector3();
    this._quaternionStart = new Quaternion();
    this._scaleStart = new Vector3();
    this._tempQuaternion = new Quaternion();
    this._tempVector = new Vector3();
    this._tempVector2 = new Vector3();
    this._tempMatrix = new Matrix4();
    this._unit = {
      X: new Vector3(1, 0, 0),
      Y: new Vector3(0, 1, 0),
      Z: new Vector3(0, 0, 1)
    };
    if (domElement === void 0) {
      console.warn(
        'THREE.TransformControls: The second parameter "domElement" is now mandatory.'
      );
      domElement = document.body;
    }
    this.domElement = domElement;
    this.cacheScene = scene;
    const gizmo = new TransformControlsGizmo();
    this.gizmo = gizmo;
    this.add(gizmo);
    const plane = new TransformControlsPlane();
    this.plane = plane;
    this.add(plane);
    const scope = this;
    function defineProperty(propName, defaultValue) {
      let propValue = defaultValue;
      Object.defineProperty(scope, propName, {
        get: function() {
          return propValue !== void 0 ? propValue : defaultValue;
        },
        set: function(value) {
          if (propValue !== value) {
            propValue = value;
            plane[propName] = value;
            gizmo[propName] = value;
          }
        }
      });
      scope[propName] = defaultValue;
      plane[propName] = defaultValue;
      gizmo[propName] = defaultValue;
    }
    defineProperty("camera", camera);
    defineProperty("object", this.object);
    defineProperty("enabled", true);
    defineProperty("axis", null);
    defineProperty("mode", "position");
    defineProperty("translationSnap", 0);
    defineProperty("rotationSnap", 0);
    defineProperty("scaleSnap", 0);
    defineProperty("space", "world");
    defineProperty("size", 1);
    defineProperty("dragging", false);
    defineProperty("showX", true);
    defineProperty("showY", true);
    defineProperty("showZ", true);
    const worldPosition = new Vector3();
    const worldPositionStart = new Vector3();
    const worldQuaternion = new Quaternion();
    const worldQuaternionStart = new Quaternion();
    const cameraPosition = new Vector3();
    const cameraQuaternion = new Quaternion();
    const pointStart = new Vector3();
    const pointEnd = new Vector3();
    const rotationAxis = new Vector3();
    const rotationAngle = 0;
    const eye = new Vector3();
    defineProperty("worldPosition", worldPosition);
    defineProperty("worldPositionStart", worldPositionStart);
    defineProperty("worldQuaternion", worldQuaternion);
    defineProperty("worldQuaternionStart", worldQuaternionStart);
    defineProperty("cameraPosition", cameraPosition);
    defineProperty("cameraQuaternion", cameraQuaternion);
    defineProperty("pointStart", pointStart);
    defineProperty("pointEnd", pointEnd);
    defineProperty("rotationAxis", rotationAxis);
    defineProperty("rotationAngle", rotationAngle);
    defineProperty("eye", eye);
    this._getPointer = this.getPointer.bind(this);
    this._onPointerDown = this.onPointerDown.bind(this);
    this._onPointerHover = this.onPointerHover.bind(this);
    this._onPointerMove = this.onPointerMove.bind(this);
    this._onPointerUp = this.onPointerUp.bind(this);
  }
  setDom(dom) {
    this.disconnect();
    this.domElement = dom;
    this.connect();
    return this;
  }
  setScene(scene) {
    this.cacheScene = scene;
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  getTransObjectSet() {
    return this.transObjectSet;
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown);
    this.domElement.addEventListener("pointermove", this._onPointerHover);
    this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerup",
      this._onPointerUp
    );
  }
  updateMatrixWorld() {
    if (this.object !== void 0) {
      this.object.updateMatrixWorld();
      if (this.object.parent === null) {
        console.error(
          "TransformControls: The attached 3D object must be a part of the scene graph."
        );
      } else {
        this.object.parent.matrixWorld.decompose(
          this._parentPosition,
          this._parentQuaternion,
          this._parentScale
        );
      }
      this.object.matrixWorld.decompose(
        this.worldPosition,
        this.worldQuaternion,
        this._worldScale
      );
      this._parentQuaternionInv.copy(this._parentQuaternion).invert();
      this._worldQuaternionInv.copy(this.worldQuaternion).invert();
    }
    this.camera.matrixWorld.decompose(
      this.cameraPosition,
      this.cameraQuaternion,
      this._cameraScale
    );
    this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize();
    super.updateMatrixWorld(true);
  }
  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown);
    this.domElement.removeEventListener("pointermove", this._onPointerHover);
    this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    );
    this.domElement.ownerDocument.removeEventListener(
      "pointerup",
      this._onPointerUp
    );
    this.traverse((child) => {
      if (child.geometry)
        child.geometry.dispose();
      if (child.material)
        child.material.dispose();
    });
  }
  attach() {
    var _a, _b;
    this.connect();
    (_a = this.cacheScene) == null ? void 0 : _a.add(this.object);
    (_b = this.cacheScene) == null ? void 0 : _b.add(this);
    return this;
  }
  detach() {
    var _a, _b;
    this.disconnect();
    (_a = this.cacheScene) == null ? void 0 : _a.remove(this);
    (_b = this.cacheScene) == null ? void 0 : _b.remove(this.object);
    this.axis = null;
    return this;
  }
  setAttach(...object) {
    this.transObjectSet.clear();
    this.cacheObjects.clear();
    if (!object.length || !object[0]) {
      this.detach();
      return this;
    }
    this.attach();
    const target = this.object;
    if (object.length === 1) {
      const currentObject = object[0];
      currentObject.matrixWorld.decompose(
        target.position,
        target.quaternion,
        target.scale
      );
      target.updateMatrix();
      target.updateMatrixWorld();
      this.transObjectSet.add(currentObject);
      const virtual = new Object3D();
      target.add(virtual);
      virtual.matrixWorld.copy(currentObject.matrixWorld);
      this.applyMatrixToMatrixWorld(virtual.matrixWorld, virtual);
      this.cacheObjects.set(currentObject, {
        matrixAutoUpdate: currentObject.matrixAutoUpdate,
        virtual
      });
      return this;
    }
    const xList = [];
    const yList = [];
    const zList = [];
    object.forEach((elem) => {
      xList.push(elem.matrixWorld.elements[12]);
      yList.push(elem.matrixWorld.elements[13]);
      zList.push(elem.matrixWorld.elements[14]);
    });
    target.rotation.set(0, 0, 0);
    target.scale.set(1, 1, 1);
    target.position.x = (Math.max(...xList) - Math.min(...xList)) / 2 + Math.min(...xList);
    target.position.y = (Math.max(...yList) - Math.min(...yList)) / 2 + Math.min(...yList);
    target.position.z = (Math.max(...zList) - Math.min(...zList)) / 2 + Math.min(...zList);
    target.updateMatrix();
    target.updateMatrixWorld();
    object.forEach((elem) => {
      this.transObjectSet.add(elem);
      const virtual = new Object3D();
      target.add(virtual);
      virtual.matrixWorld.copy(elem.matrixWorld);
      this.applyMatrixToMatrixWorld(virtual.matrixWorld, virtual);
      this.cacheObjects.set(elem, {
        matrixAutoUpdate: elem.matrixAutoUpdate,
        virtual
      });
    });
    return this;
  }
  applyMatrixToMatrixWorld(matrix, object) {
    object.matrixWorld.copy(matrix);
    object.matrix.multiplyMatrices(
      this._tempMatrix.copy(object.parent.matrixWorld).invert(),
      object.matrixWorld
    );
    object.matrix.decompose(object.position, object.quaternion, object.scale);
  }
  getMode() {
    return this.mode;
  }
  setMode(mode) {
    this.mode = mode;
  }
  setTranslationSnap(translationSnap) {
    this.translationSnap = translationSnap;
  }
  setRotationSnap(rotationSnap) {
    this.rotationSnap = rotationSnap;
  }
  setScaleSnap(scaleSnap) {
    this.scaleSnap = scaleSnap;
  }
  setSize(size) {
    this.size = size;
  }
  setSpace(space) {
    this.space = space;
  }
  intersectObjectWithRay(object, raycaster, includeInvisible) {
    const allIntersections = raycaster.intersectObject(object, true);
    for (let i = 0; i < allIntersections.length; i++) {
      if (allIntersections[i].object.visible || includeInvisible) {
        return allIntersections[i];
      }
    }
    return false;
  }
  pointerHover(pointer) {
    if (this.object === void 0 || this.dragging === true)
      return;
    this._raycaster.setFromCamera(pointer, this.camera);
    const intersect = this.intersectObjectWithRay(
      this.gizmo.picker[this.mode],
      this._raycaster
    );
    if (intersect) {
      this.axis = intersect.object.name;
      this.gizmo.updateMatrixWorld(true);
      this.plane.updateMatrixWorld(true);
      this.dispatchEvent({
        type: "hover",
        axis: this.axis,
        mode: this.mode
      });
    } else {
      this.axis = null;
    }
  }
  pointerDown(pointer) {
    if (this.object === void 0 || this.dragging === true || pointer.button !== 0)
      return;
    if (this.axis !== null) {
      this._raycaster.setFromCamera(pointer, this.camera);
      const planeIntersect = this.intersectObjectWithRay(
        this.plane,
        this._raycaster,
        true
      );
      if (planeIntersect) {
        let space = this.space;
        if (this.mode === "scale") {
          space = "local";
        } else if (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") {
          space = "world";
        }
        if (space === "local" && this.mode === "rotation") {
          const snap = this.rotationSnap;
          if (this.axis === "X" && snap)
            this.object.rotation.x = Math.round(this.object.rotation.x / snap) * snap;
          if (this.axis === "Y" && snap)
            this.object.rotation.y = Math.round(this.object.rotation.y / snap) * snap;
          if (this.axis === "Z" && snap)
            this.object.rotation.z = Math.round(this.object.rotation.z / snap) * snap;
        }
        this.object.updateMatrixWorld();
        this.object.parent && this.object.parent.updateMatrixWorld();
        this._positionStart.copy(this.object.position);
        this._quaternionStart.copy(this.object.quaternion);
        this._scaleStart.copy(this.object.scale);
        this.object.matrixWorld.decompose(
          this.worldPositionStart,
          this.worldQuaternionStart,
          this._worldScaleStart
        );
        this.pointStart.copy(planeIntersect.point).sub(this.worldPositionStart);
      }
      this.transObjectSet.forEach((object) => {
        object.matrixAutoUpdate = false;
      });
      this.dragging = true;
      this.dispatchEvent({ type: "mouseDown", mode: this.mode });
    }
  }
  pointerMove(pointer) {
    const axis = this.axis;
    const mode = this.mode;
    const object = this.object;
    let space = this.space;
    if (mode === "scale") {
      space = "local";
    } else if (axis === "E" || axis === "XYZE" || axis === "XYZ") {
      space = "world";
    }
    if (object === void 0 || axis === null || this.dragging === false || pointer.button !== -1)
      return;
    this._raycaster.setFromCamera(pointer, this.camera);
    const planeIntersect = this.intersectObjectWithRay(
      this.plane,
      this._raycaster,
      true
    );
    if (!planeIntersect)
      return;
    this.pointEnd.copy(planeIntersect.point).sub(this.worldPositionStart);
    if (mode === "position") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);
      if (space === "local" && axis !== "XYZ") {
        this._offset.applyQuaternion(this._worldQuaternionInv);
      }
      if (axis.indexOf("X") === -1)
        this._offset.x = 0;
      if (axis.indexOf("Y") === -1)
        this._offset.y = 0;
      if (axis.indexOf("Z") === -1)
        this._offset.z = 0;
      if (space === "local" && axis !== "XYZ") {
        this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale);
      } else {
        this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale);
      }
      object.position.copy(this._offset).add(this._positionStart);
      if (this.translationSnap) {
        if (space === "local") {
          object.position.applyQuaternion(
            this._tempQuaternion.copy(this._quaternionStart).invert()
          );
          if (axis.search("X") !== -1) {
            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Y") !== -1) {
            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Z") !== -1) {
            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
          }
          object.position.applyQuaternion(this._quaternionStart);
        }
        if (space === "world") {
          if (object.parent) {
            object.position.add(
              this._tempVector.setFromMatrixPosition(object.parent.matrixWorld)
            );
          }
          if (axis.search("X") !== -1) {
            object.position.x = Math.round(object.position.x / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Y") !== -1) {
            object.position.y = Math.round(object.position.y / this.translationSnap) * this.translationSnap;
          }
          if (axis.search("Z") !== -1) {
            object.position.z = Math.round(object.position.z / this.translationSnap) * this.translationSnap;
          }
          if (object.parent) {
            object.position.sub(
              this._tempVector.setFromMatrixPosition(object.parent.matrixWorld)
            );
          }
        }
      }
    } else if (mode === "scale") {
      if (axis.search("XYZ") !== -1) {
        let d = this.pointEnd.length() / this.pointStart.length();
        if (this.pointEnd.dot(this.pointStart) < 0)
          d *= -1;
        this._tempVector2.set(d, d, d);
      } else {
        this._tempVector.copy(this.pointStart);
        this._tempVector2.copy(this.pointEnd);
        this._tempVector.applyQuaternion(this._worldQuaternionInv);
        this._tempVector2.applyQuaternion(this._worldQuaternionInv);
        this._tempVector2.divide(this._tempVector);
        if (axis.search("X") === -1) {
          this._tempVector2.x = 1;
        }
        if (axis.search("Y") === -1) {
          this._tempVector2.y = 1;
        }
        if (axis.search("Z") === -1) {
          this._tempVector2.z = 1;
        }
      }
      object.scale.copy(this._scaleStart).multiply(this._tempVector2);
      if (this.scaleSnap) {
        if (axis.search("X") !== -1) {
          object.scale.x = Math.round(object.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
        if (axis.search("Y") !== -1) {
          object.scale.y = Math.round(object.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
        if (axis.search("Z") !== -1) {
          object.scale.z = Math.round(object.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap;
        }
      }
    } else if (mode === "rotation") {
      this._offset.copy(this.pointEnd).sub(this.pointStart);
      const ROTATION_SPEED = 20 / this.worldPosition.distanceTo(
        this._tempVector.setFromMatrixPosition(this.camera.matrixWorld)
      );
      if (axis === "E") {
        this.rotationAxis.copy(this.eye);
        this.rotationAngle = this.pointEnd.angleTo(this.pointStart);
        this._startNorm.copy(this.pointStart).normalize();
        this._endNorm.copy(this.pointEnd).normalize();
        this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1;
      } else if (axis === "XYZE") {
        this.rotationAxis.copy(this._offset).cross(this.eye).normalize();
        this.rotationAngle = this._offset.dot(
          this._tempVector.copy(this.rotationAxis).cross(this.eye)
        ) * ROTATION_SPEED;
      } else if (axis === "X" || axis === "Y" || axis === "Z") {
        this.rotationAxis.copy(this._unit[axis]);
        this._tempVector.copy(this._unit[axis]);
        if (space === "local") {
          this._tempVector.applyQuaternion(this.worldQuaternion);
        }
        this.rotationAngle = this._offset.dot(this._tempVector.cross(this.eye).normalize()) * ROTATION_SPEED;
      }
      if (this.rotationSnap)
        this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap;
      if (space === "local" && axis !== "E" && axis !== "XYZE") {
        object.quaternion.copy(this._quaternionStart);
        object.quaternion.multiply(
          this._tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        ).normalize();
      } else {
        this.rotationAxis.applyQuaternion(this._parentQuaternionInv);
        object.quaternion.copy(
          this._tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        );
        object.quaternion.multiply(this._quaternionStart).normalize();
      }
    }
    this.transObjectSet.forEach((elem) => {
      const cache = this.cacheObjects.get(elem);
      this.applyMatrixToMatrixWorld(cache.virtual.matrixWorld, elem);
    });
    this.dispatchEvent({
      type: "change",
      mode: this.mode,
      transObjectSet: this.transObjectSet
    });
    this.dispatchEvent({
      type: "objectChange",
      mode: this.mode,
      transObjectSet: this.transObjectSet
    });
  }
  pointerUp(pointer) {
    if (pointer.button !== 0)
      return;
    if (this.dragging && this.axis !== null) {
      this.transObjectSet.forEach((object) => {
        const cacheTrans = this.cacheObjects.get(object);
        object.matrixAutoUpdate = cacheTrans.matrixAutoUpdate;
      });
      this.dispatchEvent({ type: "mouseUp", mode: this.mode });
    }
    this.dragging = false;
    this.axis = null;
  }
  getPointer(event) {
    if (this.domElement.ownerDocument.pointerLockElement) {
      return {
        x: 0,
        y: 0,
        button: event.button
      };
    } else {
      const pointer = event.changedTouches ? event.changedTouches[0] : event;
      const rect = this.domElement.getBoundingClientRect();
      return {
        x: (pointer.clientX - rect.left) / rect.width * 2 - 1,
        y: -(pointer.clientY - rect.top) / rect.height * 2 + 1,
        button: event.button
      };
    }
  }
  onPointerDown(event) {
    if (!this.enabled)
      return;
    this.domElement.style.touchAction = "none";
    this.domElement.ownerDocument.addEventListener(
      "pointermove",
      this._onPointerMove
    );
    this.pointerHover(this._getPointer(event));
    this.pointerDown(this._getPointer(event));
  }
  onPointerHover(event) {
    if (!this.enabled)
      return;
    switch (event.pointerType) {
      case "mouse":
      case "pen":
        this.pointerHover(this._getPointer(event));
        break;
    }
  }
  onPointerMove(event) {
    if (!this.enabled)
      return;
    this.pointerMove(this._getPointer(event));
  }
  onPointerUp(event) {
    if (!this.enabled)
      return;
    this.domElement.style.touchAction = "";
    this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    );
    this.pointerUp(this._getPointer(event));
  }
}
const TRANSFORM_CONTROLS_PLUGIN = transPkgName(name);
const TransformControlsPlugin = function() {
  let setDomFun;
  let setCameraFun;
  let setSceneFun;
  return {
    name: TRANSFORM_CONTROLS_PLUGIN,
    install(engine) {
      const transformControls = new TransformControls(
        engine.camera,
        engine.dom,
        engine.scene
      );
      transformControls.detach();
      engine.transformControls = transformControls;
      engine.transformControls.addEventListener(
        TRANSFORM_EVENT.MOUSE_DOWN,
        () => {
          engine.transing = true;
        }
      );
      engine.setTransformControls = function(show) {
        this.transformControls.visible = show;
        return this;
      };
      setCameraFun = (event) => {
        event.options.transformControls && transformControls.setCamera(event.camera);
      };
      engine.addEventListener(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );
      setDomFun = (event) => {
        transformControls.setDom(event.dom);
      };
      engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      setSceneFun = (event) => {
        transformControls.setScene(event.scene);
      };
      engine.addEventListener(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
    },
    dispose(engine) {
      var _a;
      engine.removeEventListener(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );
      engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      engine.removeEventListener(
        ENGINE_EVENT.SETSCENE,
        setSceneFun
      );
      (_a = engine.transformControls) == null ? void 0 : _a.dispose();
      delete engine.transing;
      delete engine.transformControls;
      delete engine.setTransformControls;
    }
  };
};
export { TRANSFORM_CONTROLS_PLUGIN, TRANSFORM_EVENT, TransformControls, TransformControlsGizmo, TransformControlsPlane, TransformControlsPlugin };
