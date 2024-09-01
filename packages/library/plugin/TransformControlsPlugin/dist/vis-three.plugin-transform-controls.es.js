import { transPkgName as ct } from "@vis-three/utils";
import { ENGINE_EVENT as O } from "@vis-three/core";
import { Object3D as L, Vector3 as h, Quaternion as f, Euler as pt, Matrix4 as G, MeshBasicMaterial as B, DoubleSide as J, LineBasicMaterial as mt, CylinderGeometry as S, BoxGeometry as Q, BufferGeometry as R, Float32BufferAttribute as F, Mesh as a, Line as l, OctahedronGeometry as X, PlaneGeometry as I, TorusGeometry as k, SphereGeometry as dt, OrthographicCamera as ut, Color as q, Raycaster as wt } from "three";
const _t = "@vis-three/plugin-transform-controls";
class ft extends L {
  constructor() {
    super(), this.enabled = !0, this.mode = "position", this.space = "local", this.gizmo = {}, this.picker = {}, this.helper = {}, this.axis = "XYZ", this.translationSnap = null, this.rotationSnap = null, this.scaleSnap = null, this.size = 1, this.dragging = !1, this.showX = !0, this.showY = !0, this.showZ = !0, this.rotationAngle = 0, this._tempVector = new h(), this._identityQuaternion = new f(), this._tempEuler = new pt(), this._alignVector = new h(0, 1, 0), this._zeroVector = new h(0, 0, 0), this._lookAtMatrix = new G(), this._tempQuaternion = new f(), this._tempQuaternion2 = new f(), this._unitX = new h(1, 0, 0), this._unitY = new h(0, 1, 0), this._unitZ = new h(0, 0, 1), this.type = "TransformControlsGizmo";
    const s = new B({
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
      side: J,
      fog: !1,
      toneMapped: !1
    }), e = new mt({
      depthTest: !1,
      depthWrite: !1,
      transparent: !0,
      linewidth: 1,
      toneMapped: !1
    }), i = s.clone();
    i.opacity = 0.15;
    const n = s.clone();
    n.opacity = 0.33;
    const r = s.clone();
    r.color.set(16711680);
    const t = s.clone();
    t.color.set(65280);
    const o = s.clone();
    o.color.set(255);
    const m = s.clone();
    m.opacity = 0.25;
    const Y = m.clone();
    Y.color.set(16776960);
    const Z = m.clone();
    Z.color.set(65535);
    const D = m.clone();
    D.color.set(16711935), s.clone().color.set(16776960);
    const A = e.clone();
    A.color.set(16711680);
    const V = e.clone();
    V.color.set(65280);
    const T = e.clone();
    T.color.set(255);
    const E = e.clone();
    E.color.set(65535);
    const P = e.clone();
    P.color.set(16711935);
    const M = e.clone();
    M.color.set(16776960);
    const x = e.clone();
    x.color.set(7895160);
    const _ = M.clone();
    _.opacity = 0.25;
    const y = new S(0, 0.05, 0.2, 12, 1, !1), d = new Q(0.125, 0.125, 0.125), c = new R();
    c.setAttribute(
      "position",
      new F([0, 0, 0, 1, 0, 0], 3)
    );
    function z(w, W) {
      const b = new R(), v = [];
      for (let p = 0; p <= 64 * W; ++p)
        v.push(
          0,
          Math.cos(p / 32 * Math.PI) * w,
          Math.sin(p / 32 * Math.PI) * w
        );
      return b.setAttribute(
        "position",
        new F(v, 3)
      ), b;
    }
    function $() {
      const w = new R();
      return w.setAttribute(
        "position",
        new F([0, 0, 0, 1, 1, 1], 3)
      ), w;
    }
    const tt = {
      X: [
        [
          new a(y, r),
          [1, 0, 0],
          [0, 0, -Math.PI / 2],
          null,
          "fwd"
        ],
        [
          new a(y, r),
          [1, 0, 0],
          [0, 0, Math.PI / 2],
          null,
          "bwd"
        ],
        [new l(c, A)]
      ],
      Y: [
        [new a(y, t), [0, 1, 0], null, null, "fwd"],
        [
          new a(y, t),
          [0, 1, 0],
          [Math.PI, 0, 0],
          null,
          "bwd"
        ],
        [new l(c, V), null, [0, 0, Math.PI / 2]]
      ],
      Z: [
        [
          new a(y, o),
          [0, 0, 1],
          [Math.PI / 2, 0, 0],
          null,
          "fwd"
        ],
        [
          new a(y, o),
          [0, 0, 1],
          [-Math.PI / 2, 0, 0],
          null,
          "bwd"
        ],
        [new l(c, T), null, [0, -Math.PI / 2, 0]]
      ],
      XYZ: [
        [
          new a(new X(0.1, 0), m.clone()),
          [0, 0, 0],
          [0, 0, 0]
        ]
      ],
      XY: [
        [
          new a(
            new I(0.295, 0.295),
            Y.clone()
          ),
          [0.15, 0.15, 0]
        ],
        [
          new l(c, M),
          [0.18, 0.3, 0],
          null,
          [0.125, 1, 1]
        ],
        [
          new l(c, M),
          [0.3, 0.18, 0],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ]
      ],
      YZ: [
        [
          new a(new I(0.295, 0.295), Z.clone()),
          [0, 0.15, 0.15],
          [0, Math.PI / 2, 0]
        ],
        [
          new l(c, E),
          [0, 0.18, 0.3],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ],
        [
          new l(c, E),
          [0, 0.3, 0.18],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ],
      XZ: [
        [
          new a(
            new I(0.295, 0.295),
            D.clone()
          ),
          [0.15, 0, 0.15],
          [-Math.PI / 2, 0, 0]
        ],
        [
          new l(c, P),
          [0.18, 0, 0.3],
          null,
          [0.125, 1, 1]
        ],
        [
          new l(c, P),
          [0.3, 0, 0.18],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ]
    }, et = {
      X: [
        [
          new a(new S(0.2, 0, 1, 4, 1, !1), i),
          [0.6, 0, 0],
          [0, 0, -Math.PI / 2]
        ]
      ],
      Y: [
        [
          new a(new S(0.2, 0, 1, 4, 1, !1), i),
          [0, 0.6, 0]
        ]
      ],
      Z: [
        [
          new a(new S(0.2, 0, 1, 4, 1, !1), i),
          [0, 0, 0.6],
          [Math.PI / 2, 0, 0]
        ]
      ],
      XYZ: [[new a(new X(0.2, 0), i)]],
      XY: [
        [new a(new I(0.4, 0.4), i), [0.2, 0.2, 0]]
      ],
      YZ: [
        [
          new a(new I(0.4, 0.4), i),
          [0, 0.2, 0.2],
          [0, Math.PI / 2, 0]
        ]
      ],
      XZ: [
        [
          new a(new I(0.4, 0.4), i),
          [0.2, 0, 0.2],
          [-Math.PI / 2, 0, 0]
        ]
      ]
    }, it = {
      START: [
        [
          new a(new X(0.01, 2), n),
          null,
          null,
          null,
          "helper"
        ]
      ],
      END: [
        [
          new a(new X(0.01, 2), n),
          null,
          null,
          null,
          "helper"
        ]
      ],
      DELTA: [
        [
          new l($(), n),
          null,
          null,
          null,
          "helper"
        ]
      ],
      X: [
        [
          new l(c, n.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Y: [
        [
          new l(c, n.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Z: [
        [
          new l(c, n.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper"
        ]
      ]
    }, nt = {
      X: [
        [new l(z(1, 0.5), A)],
        [
          new a(new X(0.04, 0), r),
          [0, 0, 0.99],
          null,
          [1, 3, 1]
        ]
      ],
      Y: [
        [
          new l(z(1, 0.5), V),
          null,
          [0, 0, -Math.PI / 2]
        ],
        [
          new a(new X(0.04, 0), t),
          [0, 0, 0.99],
          null,
          [3, 1, 1]
        ]
      ],
      Z: [
        [
          new l(z(1, 0.5), T),
          null,
          [0, Math.PI / 2, 0]
        ],
        [
          new a(new X(0.04, 0), o),
          [0.99, 0, 0],
          null,
          [1, 3, 1]
        ]
      ],
      E: [
        [
          new l(z(1.25, 1), _),
          null,
          [0, Math.PI / 2, 0]
        ],
        [
          new a(
            new S(0.03, 0, 0.15, 4, 1, !1),
            _
          ),
          [1.17, 0, 0],
          [0, 0, -Math.PI / 2],
          [1, 1, 1e-3]
        ],
        [
          new a(
            new S(0.03, 0, 0.15, 4, 1, !1),
            _
          ),
          [-1.17, 0, 0],
          [0, 0, Math.PI / 2],
          [1, 1, 1e-3]
        ],
        [
          new a(
            new S(0.03, 0, 0.15, 4, 1, !1),
            _
          ),
          [0, -1.17, 0],
          [Math.PI, 0, 0],
          [1, 1, 1e-3]
        ],
        [
          new a(
            new S(0.03, 0, 0.15, 4, 1, !1),
            _
          ),
          [0, 1.17, 0],
          [0, 0, 0],
          [1, 1, 1e-3]
        ]
      ],
      XYZE: [
        [
          new l(z(1, 1), x),
          null,
          [0, Math.PI / 2, 0]
        ]
      ]
    }, st = {
      AXIS: [
        [
          new l(c, n.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper"
        ]
      ]
    }, ot = {
      X: [
        [
          new a(new k(1, 0.1, 4, 24), i),
          [0, 0, 0],
          [0, -Math.PI / 2, -Math.PI / 2]
        ]
      ],
      Y: [
        [
          new a(new k(1, 0.1, 4, 24), i),
          [0, 0, 0],
          [Math.PI / 2, 0, 0]
        ]
      ],
      Z: [
        [
          new a(new k(1, 0.1, 4, 24), i),
          [0, 0, 0],
          [0, 0, -Math.PI / 2]
        ]
      ],
      E: [[new a(new k(1.25, 0.1, 2, 24), i)]],
      XYZE: [[new a(new dt(0.7, 10, 8), i)]]
    }, at = {
      X: [
        [
          new a(d, r),
          [0.8, 0, 0],
          [0, 0, -Math.PI / 2]
        ],
        [new l(c, A), null, null, [0.8, 1, 1]]
      ],
      Y: [
        [new a(d, t), [0, 0.8, 0]],
        [
          new l(c, V),
          null,
          [0, 0, Math.PI / 2],
          [0.8, 1, 1]
        ]
      ],
      Z: [
        [
          new a(d, o),
          [0, 0, 0.8],
          [Math.PI / 2, 0, 0]
        ],
        [
          new l(c, T),
          null,
          [0, -Math.PI / 2, 0],
          [0.8, 1, 1]
        ]
      ],
      XY: [
        [
          new a(d, Y),
          [0.85, 0.85, 0],
          null,
          [2, 2, 0.2]
        ],
        [
          new l(c, M),
          [0.855, 0.98, 0],
          null,
          [0.125, 1, 1]
        ],
        [
          new l(c, M),
          [0.98, 0.855, 0],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ]
      ],
      YZ: [
        [
          new a(d, Z),
          [0, 0.85, 0.85],
          null,
          [0.2, 2, 2]
        ],
        [
          new l(c, E),
          [0, 0.855, 0.98],
          [0, 0, Math.PI / 2],
          [0.125, 1, 1]
        ],
        [
          new l(c, E),
          [0, 0.98, 0.855],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ],
      XZ: [
        [
          new a(d, D),
          [0.85, 0, 0.85],
          null,
          [2, 0.2, 2]
        ],
        [
          new l(c, P),
          [0.855, 0, 0.98],
          null,
          [0.125, 1, 1]
        ],
        [
          new l(c, P),
          [0.98, 0, 0.855],
          [0, -Math.PI / 2, 0],
          [0.125, 1, 1]
        ]
      ],
      XYZX: [
        [
          new a(
            new Q(0.125, 0.125, 0.125),
            m.clone()
          ),
          [1.1, 0, 0]
        ]
      ],
      XYZY: [
        [
          new a(
            new Q(0.125, 0.125, 0.125),
            m.clone()
          ),
          [0, 1.1, 0]
        ]
      ],
      XYZZ: [
        [
          new a(
            new Q(0.125, 0.125, 0.125),
            m.clone()
          ),
          [0, 0, 1.1]
        ]
      ]
    }, rt = {
      X: [
        [
          new a(
            new S(0.2, 0, 0.8, 4, 1, !1),
            i
          ),
          [0.5, 0, 0],
          [0, 0, -Math.PI / 2]
        ]
      ],
      Y: [
        [
          new a(
            new S(0.2, 0, 0.8, 4, 1, !1),
            i
          ),
          [0, 0.5, 0]
        ]
      ],
      Z: [
        [
          new a(
            new S(0.2, 0, 0.8, 4, 1, !1),
            i
          ),
          [0, 0, 0.5],
          [Math.PI / 2, 0, 0]
        ]
      ],
      XY: [
        [
          new a(d, i),
          [0.85, 0.85, 0],
          null,
          [3, 3, 0.2]
        ]
      ],
      YZ: [
        [
          new a(d, i),
          [0, 0.85, 0.85],
          null,
          [0.2, 3, 3]
        ]
      ],
      XZ: [
        [
          new a(d, i),
          [0.85, 0, 0.85],
          null,
          [3, 0.2, 3]
        ]
      ],
      XYZX: [
        [new a(new Q(0.2, 0.2, 0.2), i), [1.1, 0, 0]]
      ],
      XYZY: [
        [new a(new Q(0.2, 0.2, 0.2), i), [0, 1.1, 0]]
      ],
      XYZZ: [
        [new a(new Q(0.2, 0.2, 0.2), i), [0, 0, 1.1]]
      ]
    }, ht = {
      X: [
        [
          new l(c, n.clone()),
          [-1e3, 0, 0],
          null,
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Y: [
        [
          new l(c, n.clone()),
          [0, -1e3, 0],
          [0, 0, Math.PI / 2],
          [1e6, 1, 1],
          "helper"
        ]
      ],
      Z: [
        [
          new l(c, n.clone()),
          [0, 0, -1e3],
          [0, -Math.PI / 2, 0],
          [1e6, 1, 1],
          "helper"
        ]
      ]
    };
    function g(w) {
      const W = new L();
      for (const b in w)
        for (let v = w[b].length; v--; ) {
          const p = w[b][v][0].clone(), j = w[b][v][1], C = w[b][v][2], H = w[b][v][3], lt = w[b][v][4];
          p.name = b, p.tag = lt, j && p.position.set(j[0], j[1], j[2]), C && p.rotation.set(C[0], C[1], C[2]), H && p.scale.set(H[0], H[1], H[2]), p.updateMatrix();
          const N = p.geometry.clone();
          N.applyMatrix4(p.matrix), p.geometry = N, p.renderOrder = 1 / 0, p.position.set(0, 0, 0), p.rotation.set(0, 0, 0), p.scale.set(1, 1, 1), W.add(p);
        }
      return W;
    }
    this.gizmo = {}, this.picker = {}, this.helper = {}, this.add(this.gizmo.position = g(tt)), this.add(this.gizmo.rotation = g(nt)), this.add(this.gizmo.scale = g(at)), this.add(this.picker.position = g(et)), this.add(this.picker.rotation = g(ot)), this.add(this.picker.scale = g(rt)), this.add(this.helper.position = g(it)), this.add(this.helper.rotation = g(st)), this.add(this.helper.scale = g(ht)), this.picker.position.visible = !1, this.picker.rotation.visible = !1, this.picker.scale.visible = !1;
  }
  // updateMatrixWorld will update transformations and appearance of individual handles
  updateMatrixWorld(s) {
    const i = (this.mode === "scale" ? "local" : this.space) === "local" ? this.worldQuaternion : this._identityQuaternion;
    this.gizmo.position.visible = this.mode === "position", this.gizmo.rotation.visible = this.mode === "rotation", this.gizmo.scale.visible = this.mode === "scale", this.helper.position.visible = this.mode === "position", this.helper.rotation.visible = this.mode === "rotation", this.helper.scale.visible = this.mode === "scale";
    let n = [];
    n = n.concat(this.picker[this.mode].children), n = n.concat(this.gizmo[this.mode].children), n = n.concat(this.helper[this.mode].children);
    for (let r = 0; r < n.length; r++) {
      const t = n[r];
      t.visible = !0, t.rotation.set(0, 0, 0), t.position.copy(this.worldPosition);
      let o;
      if (this.camera instanceof ut ? o = (this.camera.top - this.camera.bottom) / this.camera.zoom : o = this.worldPosition.distanceTo(this.cameraPosition) * Math.min(
        1.9 * Math.tan(Math.PI * this.camera.fov / 360) / this.camera.zoom,
        7
      ), t.scale.set(1, 1, 1).multiplyScalar(o * this.size / 7), t.tag === "helper") {
        t.visible = !1, t.name === "AXIS" ? (t.position.copy(this.worldPositionStart), t.visible = !!this.axis, this.axis === "X" && (this._tempQuaternion.setFromEuler(this._tempEuler.set(0, 0, 0)), t.quaternion.copy(i).multiply(this._tempQuaternion), Math.abs(
          this._alignVector.copy(this._unitX).applyQuaternion(i).dot(this.eye)
        ) > 0.9 && (t.visible = !1)), this.axis === "Y" && (this._tempQuaternion.setFromEuler(
          this._tempEuler.set(0, 0, Math.PI / 2)
        ), t.quaternion.copy(i).multiply(this._tempQuaternion), Math.abs(
          this._alignVector.copy(this._unitY).applyQuaternion(i).dot(this.eye)
        ) > 0.9 && (t.visible = !1)), this.axis === "Z" && (this._tempQuaternion.setFromEuler(
          this._tempEuler.set(0, Math.PI / 2, 0)
        ), t.quaternion.copy(i).multiply(this._tempQuaternion), Math.abs(
          this._alignVector.copy(this._unitZ).applyQuaternion(i).dot(this.eye)
        ) > 0.9 && (t.visible = !1)), this.axis === "XYZE" && (this._tempQuaternion.setFromEuler(
          this._tempEuler.set(0, Math.PI / 2, 0)
        ), this._alignVector.copy(this.rotationAxis), t.quaternion.setFromRotationMatrix(
          this._lookAtMatrix.lookAt(
            this._zeroVector,
            this._alignVector,
            this._unitY
          )
        ), t.quaternion.multiply(this._tempQuaternion), t.visible = this.dragging), this.axis === "E" && (t.visible = !1)) : t.name === "START" ? (t.position.copy(this.worldPositionStart), t.visible = this.dragging) : t.name === "END" ? (t.position.copy(this.worldPosition), t.visible = this.dragging) : t.name === "DELTA" ? (t.position.copy(this.worldPositionStart), t.quaternion.copy(this.worldQuaternionStart), this._tempVector.set(1e-10, 1e-10, 1e-10).add(this.worldPositionStart).sub(this.worldPosition).multiplyScalar(-1), this._tempVector.applyQuaternion(
          this.worldQuaternionStart.clone().invert()
        ), t.scale.copy(this._tempVector), t.visible = this.dragging) : (t.quaternion.copy(i), this.dragging ? t.position.copy(this.worldPositionStart) : t.position.copy(this.worldPosition), this.axis && (t.visible = this.axis.search(t.name) !== -1));
        continue;
      }
      t.quaternion.copy(i), this.mode === "position" || this.mode === "scale" ? ((t.name === "X" || t.name === "XYZX") && Math.abs(
        this._alignVector.copy(this._unitX).applyQuaternion(i).dot(this.eye)
      ) > 0.99 && (t.scale.set(1e-10, 1e-10, 1e-10), t.visible = !1), (t.name === "Y" || t.name === "XYZY") && Math.abs(
        this._alignVector.copy(this._unitY).applyQuaternion(i).dot(this.eye)
      ) > 0.99 && (t.scale.set(1e-10, 1e-10, 1e-10), t.visible = !1), (t.name === "Z" || t.name === "XYZZ") && Math.abs(
        this._alignVector.copy(this._unitZ).applyQuaternion(i).dot(this.eye)
      ) > 0.99 && (t.scale.set(1e-10, 1e-10, 1e-10), t.visible = !1), t.name === "XY" && Math.abs(
        this._alignVector.copy(this._unitZ).applyQuaternion(i).dot(this.eye)
      ) < 0.2 && (t.scale.set(1e-10, 1e-10, 1e-10), t.visible = !1), t.name === "YZ" && Math.abs(
        this._alignVector.copy(this._unitX).applyQuaternion(i).dot(this.eye)
      ) < 0.2 && (t.scale.set(1e-10, 1e-10, 1e-10), t.visible = !1), t.name === "XZ" && Math.abs(
        this._alignVector.copy(this._unitY).applyQuaternion(i).dot(this.eye)
      ) < 0.2 && (t.scale.set(1e-10, 1e-10, 1e-10), t.visible = !1), t.name.search("X") !== -1 && (this._alignVector.copy(this._unitX).applyQuaternion(i).dot(this.eye) < 0 ? t.tag === "fwd" ? t.visible = !1 : t.scale.x *= -1 : t.tag === "bwd" && (t.visible = !1)), t.name.search("Y") !== -1 && (this._alignVector.copy(this._unitY).applyQuaternion(i).dot(this.eye) < 0 ? t.tag === "fwd" ? t.visible = !1 : t.scale.y *= -1 : t.tag === "bwd" && (t.visible = !1)), t.name.search("Z") !== -1 && (this._alignVector.copy(this._unitZ).applyQuaternion(i).dot(this.eye) < 0 ? t.tag === "fwd" ? t.visible = !1 : t.scale.z *= -1 : t.tag === "bwd" && (t.visible = !1))) : this.mode === "rotation" && (this._tempQuaternion2.copy(i), this._alignVector.copy(this.eye).applyQuaternion(this._tempQuaternion.copy(i).invert()), t.name.search("E") !== -1 && t.quaternion.setFromRotationMatrix(
        this._lookAtMatrix.lookAt(this.eye, this._zeroVector, this._unitY)
      ), t.name === "X" && (this._tempQuaternion.setFromAxisAngle(
        this._unitX,
        Math.atan2(-this._alignVector.y, this._alignVector.z)
      ), this._tempQuaternion.multiplyQuaternions(
        this._tempQuaternion2,
        this._tempQuaternion
      ), t.quaternion.copy(this._tempQuaternion)), t.name === "Y" && (this._tempQuaternion.setFromAxisAngle(
        this._unitY,
        Math.atan2(this._alignVector.x, this._alignVector.z)
      ), this._tempQuaternion.multiplyQuaternions(
        this._tempQuaternion2,
        this._tempQuaternion
      ), t.quaternion.copy(this._tempQuaternion)), t.name === "Z" && (this._tempQuaternion.setFromAxisAngle(
        this._unitZ,
        Math.atan2(this._alignVector.y, this._alignVector.x)
      ), this._tempQuaternion.multiplyQuaternions(
        this._tempQuaternion2,
        this._tempQuaternion
      ), t.quaternion.copy(this._tempQuaternion))), t.visible = t.visible && (t.name.indexOf("X") === -1 || this.showX), t.visible = t.visible && (t.name.indexOf("Y") === -1 || this.showY), t.visible = t.visible && (t.name.indexOf("Z") === -1 || this.showZ), t.visible = t.visible && (t.name.indexOf("E") === -1 || this.showX && this.showY && this.showZ), t.material._opacity = t.material._opacity || t.material.opacity, t.material._color = t.material._color || t.material.color.clone(), t.material.color.copy(t.material._color), t.material.opacity = t.material._opacity, this.enabled ? this.axis && (t.name === this.axis ? (t.material.opacity = 1, t.material.color.lerp(new q(1, 1, 1), 0.5)) : this.axis.split("").some(function(m) {
        return t.name === m;
      }) ? (t.material.opacity = 1, t.material.color.lerp(new q(1, 1, 1), 0.5)) : (t.material.opacity *= 0.25, t.material.color.lerp(new q(1, 1, 1), 0.5))) : (t.material.opacity *= 0.5, t.material.color.lerp(new q(1, 1, 1), 0.5));
    }
    super.updateMatrixWorld(s);
  }
}
class yt extends a {
  constructor() {
    super(
      new I(1e5, 1e5, 2, 2),
      new B({
        visible: !1,
        wireframe: !0,
        side: J,
        transparent: !0,
        opacity: 0.1,
        toneMapped: !1
      })
    ), this.enabled = !0, this.mode = "position", this.space = "local", this.gizmo = {}, this.picker = {}, this.helper = {}, this.axis = "XYZ", this.translationSnap = null, this.rotationSnap = null, this.scaleSnap = null, this.size = 1, this.dragging = !1, this.showX = !0, this.showY = !0, this.showZ = !0, this.rotationAngle = 0, this._tempVector = new h(), this._identityQuaternion = new f(), this._alignVector = new h(0, 1, 0), this._dirVector = new h(), this._tempMatrix = new G(), this._unitX = new h(1, 0, 0), this._unitY = new h(0, 1, 0), this._unitZ = new h(0, 0, 1), this._v1 = new h(), this._v2 = new h(), this._v3 = new h(), this.type = "TransformControlsPlane";
  }
  updateMatrixWorld(s) {
    let e = this.space;
    switch (this.position.copy(this.worldPosition), this.mode === "scale" && (e = "local"), this._v1.copy(this._unitX).applyQuaternion(
      e === "local" ? this.worldQuaternion : this._identityQuaternion
    ), this._v2.copy(this._unitY).applyQuaternion(
      e === "local" ? this.worldQuaternion : this._identityQuaternion
    ), this._v3.copy(this._unitZ).applyQuaternion(
      e === "local" ? this.worldQuaternion : this._identityQuaternion
    ), this._alignVector.copy(this._v2), this.mode) {
      case "position":
      case "scale":
        switch (this.axis) {
          case "X":
            this._alignVector.copy(this.eye).cross(this._v1), this._dirVector.copy(this._v1).cross(this._alignVector);
            break;
          case "Y":
            this._alignVector.copy(this.eye).cross(this._v2), this._dirVector.copy(this._v2).cross(this._alignVector);
            break;
          case "Z":
            this._alignVector.copy(this.eye).cross(this._v3), this._dirVector.copy(this._v3).cross(this._alignVector);
            break;
          case "XY":
            this._dirVector.copy(this._v3);
            break;
          case "YZ":
            this._dirVector.copy(this._v1);
            break;
          case "XZ":
            this._alignVector.copy(this._v3), this._dirVector.copy(this._v2);
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
    this._dirVector.length() === 0 ? this.quaternion.copy(this.cameraQuaternion) : (this._tempMatrix.lookAt(
      this._tempVector.set(0, 0, 0),
      this._dirVector,
      this._alignVector
    ), this.quaternion.setFromRotationMatrix(this._tempMatrix)), super.updateMatrixWorld(s);
  }
}
var K = /* @__PURE__ */ ((u) => (u.HOVER = "hover", u.CHANGE = "change", u.MOUSE_DOWN = "mouseDown", u.OBJECT_CHANGE = "objectChange", u.MOUSE_UP = "mouseUp", u))(K || {});
class St extends L {
  constructor(s, e, i) {
    super(), this.object = new L(), this.enabled = !0, this.mode = "position", this.space = "local", this.axis = "XYZ", this.translationSnap = 0, this.rotationSnap = 0, this.scaleSnap = 0, this.size = 1, this.dragging = !1, this.showX = !0, this.showY = !0, this.showZ = !0, this.cacheScene = null, this.transObjectSet = /* @__PURE__ */ new Set(), this.cacheObjects = /* @__PURE__ */ new Map(), this.rotationAngle = 0, this._raycaster = new wt(), this._offset = new h(), this._startNorm = new h(), this._endNorm = new h(), this._cameraScale = new h(), this._parentPosition = new h(), this._parentQuaternion = new f(), this._parentQuaternionInv = new f(), this._parentScale = new h(), this._worldScaleStart = new h(), this._worldQuaternionInv = new f(), this._worldScale = new h(), this._positionStart = new h(), this._quaternionStart = new f(), this._scaleStart = new h(), this._tempQuaternion = new f(), this._tempVector = new h(), this._tempVector2 = new h(), this._tempMatrix = new G(), this._unit = {
      X: new h(1, 0, 0),
      Y: new h(0, 1, 0),
      Z: new h(0, 0, 1)
    }, e === void 0 && (console.warn(
      'THREE.TransformControls: The second parameter "domElement" is now mandatory.'
    ), e = document.body), this.domElement = e, this.cacheScene = i;
    const n = new ft();
    this.gizmo = n, this.add(n);
    const r = new yt();
    this.plane = r, this.add(r);
    const t = this;
    function o(x, _) {
      let y = _;
      Object.defineProperty(t, x, {
        get: function() {
          return y !== void 0 ? y : _;
        },
        set: function(d) {
          y !== d && (y = d, r[x] = d, n[x] = d);
        }
      }), t[x] = _, r[x] = _, n[x] = _;
    }
    o("camera", s), o("object", this.object), o("enabled", !0), o("axis", null), o("mode", "position"), o("translationSnap", 0), o("rotationSnap", 0), o("scaleSnap", 0), o("space", "world"), o("size", 1), o("dragging", !1), o("showX", !0), o("showY", !0), o("showZ", !0);
    const m = new h(), Y = new h(), Z = new f(), D = new f(), U = new h(), A = new f(), V = new h(), T = new h(), E = new h(), P = 0, M = new h();
    o("worldPosition", m), o("worldPositionStart", Y), o("worldQuaternion", Z), o("worldQuaternionStart", D), o("cameraPosition", U), o("cameraQuaternion", A), o("pointStart", V), o("pointEnd", T), o("rotationAxis", E), o("rotationAngle", P), o("eye", M), this._getPointer = this.getPointer.bind(this), this._onPointerDown = this.onPointerDown.bind(this), this._onPointerHover = this.onPointerHover.bind(this), this._onPointerMove = this.onPointerMove.bind(this), this._onPointerUp = this.onPointerUp.bind(this);
  }
  setDom(s) {
    return this.disconnect(), this.domElement = s, this.connect(), this;
  }
  setScene(s) {
    this.cacheScene = s;
  }
  setCamera(s) {
    return this.camera = s, this;
  }
  getTransObjectSet() {
    return this.transObjectSet;
  }
  connect() {
    this.domElement.addEventListener("pointerdown", this._onPointerDown), this.domElement.addEventListener("pointermove", this._onPointerHover), this.domElement.addEventListener("pointerup", this._onPointerUp);
  }
  disconnect() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    ), this.domElement.ownerDocument.removeEventListener(
      "pointerup",
      this._onPointerUp
    );
  }
  // updateMatrixWorld  updates key transformation variables
  updateMatrixWorld() {
    this.object !== void 0 && (this.object.updateMatrixWorld(), this.object.parent === null ? console.error(
      "TransformControls: The attached 3D object must be a part of the scene graph."
    ) : this.object.parent.matrixWorld.decompose(
      this._parentPosition,
      this._parentQuaternion,
      this._parentScale
    ), this.object.matrixWorld.decompose(
      this.worldPosition,
      this.worldQuaternion,
      this._worldScale
    ), this._parentQuaternionInv.copy(this._parentQuaternion).invert(), this._worldQuaternionInv.copy(this.worldQuaternion).invert()), this.camera.matrixWorld.decompose(
      this.cameraPosition,
      this.cameraQuaternion,
      this._cameraScale
    ), this.eye.copy(this.cameraPosition).sub(this.worldPosition).normalize(), super.updateMatrixWorld(!0);
  }
  dispose() {
    this.domElement.removeEventListener("pointerdown", this._onPointerDown), this.domElement.removeEventListener("pointermove", this._onPointerHover), this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    ), this.domElement.ownerDocument.removeEventListener(
      "pointerup",
      this._onPointerUp
    ), this.traverse((s) => {
      s.geometry && s.geometry.dispose(), s.material && s.material.dispose();
    });
  }
  attach() {
    var s, e;
    return this.connect(), (s = this.cacheScene) == null || s.add(this.object), (e = this.cacheScene) == null || e.add(this), this;
  }
  // Detatch
  detach() {
    var s, e;
    return this.disconnect(), (s = this.cacheScene) == null || s.remove(this), (e = this.cacheScene) == null || e.remove(this.object), this.axis = null, this;
  }
  setAttach(...s) {
    if (this.transObjectSet.clear(), this.cacheObjects.clear(), !s.length || !s[0])
      return this.detach(), this;
    this.attach();
    const e = this.object;
    if (s.length === 1) {
      const t = s[0];
      t.matrixWorld.decompose(
        e.position,
        e.quaternion,
        e.scale
      ), e.updateMatrix(), e.updateMatrixWorld(), this.transObjectSet.add(t);
      const o = new L();
      return e.add(o), o.matrixWorld.copy(t.matrixWorld), this.applyMatrixToMatrixWorld(o.matrixWorld, o), this.cacheObjects.set(t, {
        matrixAutoUpdate: t.matrixAutoUpdate,
        virtual: o
      }), this;
    }
    const i = [], n = [], r = [];
    return s.forEach((t) => {
      i.push(t.matrixWorld.elements[12]), n.push(t.matrixWorld.elements[13]), r.push(t.matrixWorld.elements[14]);
    }), e.rotation.set(0, 0, 0), e.scale.set(1, 1, 1), e.position.x = (Math.max(...i) - Math.min(...i)) / 2 + Math.min(...i), e.position.y = (Math.max(...n) - Math.min(...n)) / 2 + Math.min(...n), e.position.z = (Math.max(...r) - Math.min(...r)) / 2 + Math.min(...r), e.updateMatrix(), e.updateMatrixWorld(), s.forEach((t) => {
      this.transObjectSet.add(t);
      const o = new L();
      e.add(o), o.matrixWorld.copy(t.matrixWorld), this.applyMatrixToMatrixWorld(o.matrixWorld, o), this.cacheObjects.set(t, {
        matrixAutoUpdate: t.matrixAutoUpdate,
        virtual: o
      });
    }), this;
  }
  applyMatrixToMatrixWorld(s, e) {
    e.matrixWorld.copy(s), e.matrix.multiplyMatrices(
      this._tempMatrix.copy(e.parent.matrixWorld).invert(),
      e.matrixWorld
    ), e.matrix.decompose(e.position, e.quaternion, e.scale);
  }
  // TODO: deprecate
  getMode() {
    return this.mode;
  }
  setMode(s) {
    this.mode = s;
  }
  setTranslationSnap(s) {
    this.translationSnap = s;
  }
  setRotationSnap(s) {
    this.rotationSnap = s;
  }
  setScaleSnap(s) {
    this.scaleSnap = s;
  }
  setSize(s) {
    this.size = s;
  }
  setSpace(s) {
    this.space = s;
  }
  intersectObjectWithRay(s, e, i) {
    const n = e.intersectObject(s, !0);
    for (let r = 0; r < n.length; r++)
      if (n[r].object.visible || i)
        return n[r];
    return !1;
  }
  pointerHover(s) {
    if (this.object === void 0 || this.dragging === !0) return;
    this._raycaster.setFromCamera(s, this.camera);
    const e = this.intersectObjectWithRay(
      this.gizmo.picker[this.mode],
      this._raycaster
    );
    e ? (this.axis = e.object.name, this.gizmo.updateMatrixWorld(!0), this.plane.updateMatrixWorld(!0), this.dispatchEvent({
      type: "hover",
      axis: this.axis,
      mode: this.mode
    })) : this.axis = null;
  }
  pointerDown(s) {
    if (!(this.object === void 0 || this.dragging === !0 || s.button !== 0) && this.axis !== null) {
      this._raycaster.setFromCamera(s, this.camera);
      const e = this.intersectObjectWithRay(
        this.plane,
        this._raycaster,
        !0
      );
      if (e) {
        let i = this.space;
        if (this.mode === "scale" ? i = "local" : (this.axis === "E" || this.axis === "XYZE" || this.axis === "XYZ") && (i = "world"), i === "local" && this.mode === "rotation") {
          const n = this.rotationSnap;
          this.axis === "X" && n && (this.object.rotation.x = Math.round(this.object.rotation.x / n) * n), this.axis === "Y" && n && (this.object.rotation.y = Math.round(this.object.rotation.y / n) * n), this.axis === "Z" && n && (this.object.rotation.z = Math.round(this.object.rotation.z / n) * n);
        }
        this.object.updateMatrixWorld(), this.object.parent && this.object.parent.updateMatrixWorld(), this._positionStart.copy(this.object.position), this._quaternionStart.copy(this.object.quaternion), this._scaleStart.copy(this.object.scale), this.object.matrixWorld.decompose(
          this.worldPositionStart,
          this.worldQuaternionStart,
          this._worldScaleStart
        ), this.pointStart.copy(e.point).sub(this.worldPositionStart);
      }
      this.transObjectSet.forEach((i) => {
        i.matrixAutoUpdate = !1;
        const r = this.cacheObjects.get(i).virtual;
        r.matrixWorld.copy(i.matrixWorld), this.applyMatrixToMatrixWorld(r.matrixWorld, r);
      }), this.dragging = !0, this.dispatchEvent({ type: "mouseDown", mode: this.mode });
    }
  }
  pointerMove(s) {
    const e = this.axis, i = this.mode, n = this.object;
    let r = this.space;
    if (i === "scale" ? r = "local" : (e === "E" || e === "XYZE" || e === "XYZ") && (r = "world"), n === void 0 || e === null || this.dragging === !1 || s.button !== -1)
      return;
    this._raycaster.setFromCamera(s, this.camera);
    const t = this.intersectObjectWithRay(
      this.plane,
      this._raycaster,
      !0
    );
    if (t) {
      if (this.pointEnd.copy(t.point).sub(this.worldPositionStart), i === "position")
        this._offset.copy(this.pointEnd).sub(this.pointStart), r === "local" && e !== "XYZ" && this._offset.applyQuaternion(this._worldQuaternionInv), e.indexOf("X") === -1 && (this._offset.x = 0), e.indexOf("Y") === -1 && (this._offset.y = 0), e.indexOf("Z") === -1 && (this._offset.z = 0), r === "local" && e !== "XYZ" ? this._offset.applyQuaternion(this._quaternionStart).divide(this._parentScale) : this._offset.applyQuaternion(this._parentQuaternionInv).divide(this._parentScale), n.position.copy(this._offset).add(this._positionStart), this.translationSnap && (r === "local" && (n.position.applyQuaternion(
          this._tempQuaternion.copy(this._quaternionStart).invert()
        ), e.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), e.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), e.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.position.applyQuaternion(this._quaternionStart)), r === "world" && (n.parent && n.position.add(
          this._tempVector.setFromMatrixPosition(n.parent.matrixWorld)
        ), e.search("X") !== -1 && (n.position.x = Math.round(n.position.x / this.translationSnap) * this.translationSnap), e.search("Y") !== -1 && (n.position.y = Math.round(n.position.y / this.translationSnap) * this.translationSnap), e.search("Z") !== -1 && (n.position.z = Math.round(n.position.z / this.translationSnap) * this.translationSnap), n.parent && n.position.sub(
          this._tempVector.setFromMatrixPosition(n.parent.matrixWorld)
        )));
      else if (i === "scale") {
        if (e.search("XYZ") !== -1) {
          let o = this.pointEnd.length() / this.pointStart.length();
          this.pointEnd.dot(this.pointStart) < 0 && (o *= -1), this._tempVector2.set(o, o, o);
        } else
          this._tempVector.copy(this.pointStart), this._tempVector2.copy(this.pointEnd), this._tempVector.applyQuaternion(this._worldQuaternionInv), this._tempVector2.applyQuaternion(this._worldQuaternionInv), this._tempVector2.divide(this._tempVector), e.search("X") === -1 && (this._tempVector2.x = 1), e.search("Y") === -1 && (this._tempVector2.y = 1), e.search("Z") === -1 && (this._tempVector2.z = 1);
        n.scale.copy(this._scaleStart).multiply(this._tempVector2), this.scaleSnap && (e.search("X") !== -1 && (n.scale.x = Math.round(n.scale.x / this.scaleSnap) * this.scaleSnap || this.scaleSnap), e.search("Y") !== -1 && (n.scale.y = Math.round(n.scale.y / this.scaleSnap) * this.scaleSnap || this.scaleSnap), e.search("Z") !== -1 && (n.scale.z = Math.round(n.scale.z / this.scaleSnap) * this.scaleSnap || this.scaleSnap));
      } else if (i === "rotation") {
        this._offset.copy(this.pointEnd).sub(this.pointStart);
        const o = 20 / this.worldPosition.distanceTo(
          this._tempVector.setFromMatrixPosition(this.camera.matrixWorld)
        );
        e === "E" ? (this.rotationAxis.copy(this.eye), this.rotationAngle = this.pointEnd.angleTo(this.pointStart), this._startNorm.copy(this.pointStart).normalize(), this._endNorm.copy(this.pointEnd).normalize(), this.rotationAngle *= this._endNorm.cross(this._startNorm).dot(this.eye) < 0 ? 1 : -1) : e === "XYZE" ? (this.rotationAxis.copy(this._offset).cross(this.eye).normalize(), this.rotationAngle = this._offset.dot(
          this._tempVector.copy(this.rotationAxis).cross(this.eye)
        ) * o) : (e === "X" || e === "Y" || e === "Z") && (this.rotationAxis.copy(this._unit[e]), this._tempVector.copy(this._unit[e]), r === "local" && this._tempVector.applyQuaternion(this.worldQuaternion), this.rotationAngle = this._offset.dot(this._tempVector.cross(this.eye).normalize()) * o), this.rotationSnap && (this.rotationAngle = Math.round(this.rotationAngle / this.rotationSnap) * this.rotationSnap), r === "local" && e !== "E" && e !== "XYZE" ? (n.quaternion.copy(this._quaternionStart), n.quaternion.multiply(
          this._tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        ).normalize()) : (this.rotationAxis.applyQuaternion(this._parentQuaternionInv), n.quaternion.copy(
          this._tempQuaternion.setFromAxisAngle(
            this.rotationAxis,
            this.rotationAngle
          )
        ), n.quaternion.multiply(this._quaternionStart).normalize());
      }
      this.transObjectSet.forEach((o) => {
        const m = this.cacheObjects.get(o);
        this.applyMatrixToMatrixWorld(m.virtual.matrixWorld, o);
      }), this.dispatchEvent({
        type: "change",
        mode: this.mode,
        transObjectSet: this.transObjectSet
      }), this.dispatchEvent({
        type: "objectChange",
        mode: this.mode,
        transObjectSet: this.transObjectSet
      });
    }
  }
  pointerUp(s) {
    s.button === 0 && (this.dragging && this.axis !== null && (this.transObjectSet.forEach((e) => {
      const i = this.cacheObjects.get(e);
      e.matrixAutoUpdate = i.matrixAutoUpdate;
    }), this.dispatchEvent({ type: "mouseUp", mode: this.mode })), this.dragging = !1, this.axis = null);
  }
  getPointer(s) {
    if (this.domElement.ownerDocument.pointerLockElement)
      return {
        x: 0,
        y: 0,
        button: s.button
      };
    {
      const e = s.changedTouches ? s.changedTouches[0] : s, i = this.domElement.getBoundingClientRect();
      return {
        x: (e.clientX - i.left) / i.width * 2 - 1,
        y: -(e.clientY - i.top) / i.height * 2 + 1,
        button: s.button
      };
    }
  }
  onPointerDown(s) {
    this.enabled && (this.domElement.style.touchAction = "none", this.domElement.ownerDocument.addEventListener(
      "pointermove",
      this._onPointerMove
    ), this.pointerHover(this._getPointer(s)), this.pointerDown(this._getPointer(s)));
  }
  onPointerHover(s) {
    if (this.enabled)
      switch (s.pointerType) {
        case "mouse":
        case "pen":
          this.pointerHover(this._getPointer(s));
          break;
      }
  }
  onPointerMove(s) {
    this.enabled && this.pointerMove(this._getPointer(s));
  }
  onPointerUp(s) {
    this.enabled && (this.domElement.style.touchAction = "", this.domElement.ownerDocument.removeEventListener(
      "pointermove",
      this._onPointerMove
    ), this.pointerUp(this._getPointer(s)));
  }
}
const bt = ct(_t), Mt = function() {
  let u, s, e;
  return {
    name: bt,
    install(i) {
      const n = new St(
        i.camera,
        i.dom,
        i.scene
      );
      n.detach(), i.transformControls = n, i.transformControls.addEventListener(
        K.MOUSE_DOWN,
        () => {
          i.transing = !0;
        }
      ), i.setTransformControls = function(r) {
        return this.transformControls.visible = r, this.transformControls.enabled = r, this;
      }, s = (r) => {
        r.options.transformControls && n.setCamera(r.camera);
      }, i.addEventListener(
        O.SETCAMERA,
        s
      ), u = (r) => {
        n.setDom(r.dom);
      }, i.addEventListener(O.SETDOM, u), e = (r) => {
        n.setScene(r.scene);
      }, i.addEventListener(
        O.SETSCENE,
        e
      );
    },
    dispose(i) {
      var n;
      i.removeEventListener(
        O.SETCAMERA,
        s
      ), i.removeEventListener(O.SETDOM, u), i.removeEventListener(
        O.SETSCENE,
        e
      ), (n = i.transformControls) == null || n.dispose(), delete i.transing, delete i.transformControls, delete i.setTransformControls;
    }
  };
};
export {
  bt as TRANSFORM_CONTROLS_PLUGIN,
  K as TRANSFORM_EVENT,
  St as TransformControls,
  ft as TransformControlsGizmo,
  yt as TransformControlsPlane,
  Mt as TransformControlsPlugin
};
