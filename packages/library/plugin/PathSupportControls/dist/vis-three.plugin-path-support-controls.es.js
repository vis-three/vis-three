import { ENGINE_EVENT as u } from "@vis-three/core";
import { PLUGINS as P, POINTER_MANAGER_PLUGIN as w } from "@vis-three/tdcm";
import { transPkgName as z } from "@vis-three/utils";
import { CanvasTexture as y, Object3D as E, Raycaster as x, Points as b, BufferGeometry as v, LineSegments as G, Plane as T, Vector3 as l, Quaternion as C, PointsMaterial as I, AlwaysDepth as M, LineBasicMaterial as D, BufferAttribute as S, DynamicDrawUsage as A } from "three";
import { CanvasGenerator as g } from "@vis-three/convenient";
const H = "@vis-three/plugin-path-support-controls", L = new y(
  new g({ width: 32, height: 32 }).draw((s) => {
    s.beginPath(), s.fillStyle = "rgba(0, 0, 0, 0)", s.fillRect(0, 0, 32, 32), s.closePath(), s.beginPath(), s.fillStyle = "rgb(0, 255, 238)", s.strokeStyle = "black", s.lineWidth = 1, s.arc(16, 16, 15, 0, 2 * Math.PI), s.stroke(), s.fill(), s.closePath();
  }).getDom()
), R = new y(
  new g({ width: 32, height: 32 }).draw((s) => {
    s.beginPath(), s.fillStyle = "rgba(0, 0, 0, 0)", s.fillRect(0, 0, 32, 32), s.closePath(), s.beginPath(), s.fillStyle = "rgb(255, 248, 0)", s.strokeStyle = "black", s.lineWidth = 1, s.arc(16, 16, 15, 0, 2 * Math.PI), s.stroke(), s.fill(), s.closePath();
  }).getDom()
);
new y(
  new g({ width: 32, height: 32 }).draw((s) => {
    s.beginPath(), s.fillStyle = "rgba(0, 0, 0, 0)", s.fillRect(0, 0, 32, 32), s.closePath(), s.beginPath(), s.fillStyle = "rgb(255, 0, 0)", s.strokeStyle = "black", s.lineWidth = 1, s.moveTo(1, 0), s.lineTo(31, 16), s.lineTo(0, 31), s.lineTo(1, 0), s.stroke(), s.fill(), s.closePath();
  }).getDom()
);
const m = class m extends E {
  constructor(i, a, r, n) {
    super(), this.dragging = !1, this.raycaster = new x(), this.anchorGizmo = new b(
      new v(),
      m.anchorMaterial
    ), this.moveGizmo = new b(
      new v(),
      m.moveMaterial
    ), this.moveHelper = new G(
      new v(),
      m.moveHelperMaterial
    ), this.plane = new T(), this.cachePlaneVector3 = new l(), this.cacheQuaternion = new C(), this.cacheNormal = new l(), this.cachePosition = new l(), this.cacheMouseDownPoistion = new l(), this.cacheMouseMoveDirection = new l(), this.cacheConfigIndex = 0, this.moveCurveIndexMap = {}, this.helperRangeMap = {}, this.currentIndex = 0, this.pathType = 2, this._pointerHover = this.pointerHover.bind(this), this._pointerMove = this.pointerMove.bind(this), this._pointerDown = this.pointerDown.bind(this), this._pointerUp = this.pointerUp.bind(this), this.anchorGizmo.type = "PathSupportControlsAnchorGizmo", this.moveGizmo.type = "PathSupportControlsMoveGizmo", this.moveHelper.type = "PathSupportControlsMoveHelper", this.moveHelper.raycast = () => {
    }, this.add(this.anchorGizmo, this.moveGizmo, this.moveHelper), this.renderOrder = 1 / 0, this.matrixAutoUpdate = !1, r && this.setObject(r), n && this.setConfig(n), this.setDom(a).setCamera(i).connect();
  }
  setDom(i) {
    return this.domElement && this.disconnect(), this.domElement = i, this.connect(), this;
  }
  setCamera(i) {
    return this.camera = i, this;
  }
  setObject(i) {
    return this.object = i, this.matrix = i.matrix, this.matrixWorld = i.matrixWorld, this.cacheObjectInvert = i.matrixWorld.clone().invert(), i.parent.add(this), this;
  }
  setConfig(i) {
    this.config = i, this.moveCurveIndexMap = {}, this.helperRangeMap = {};
    const a = this.moveCurveIndexMap, r = this.helperRangeMap, n = [], e = [], o = [];
    this.config.type === "Path" ? (this.pathType = 2, this.config.curves.forEach((t, h, p) => {
      h === p.length - 1 ? n.push(
        t.params[0],
        t.params[1],
        0,
        t.params[t.params.length - 2],
        t.params[t.params.length - 1],
        0
      ) : n.push(t.params[0], t.params[1], 0), t.curve === "arc" ? (e.push(t.params[2], t.params[3], 0), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c1"
      }) : t.curve === "bezier" || t.curve === "cubic" ? (e.push(t.params[2], t.params[3], 0), o.push(
        t.params[0],
        t.params[1],
        0,
        t.params[2],
        t.params[3],
        0
      ), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c1"
      }, e.push(
        t.params[4],
        t.params[5],
        0
      ), o.push(
        t.params[t.params.length - 2],
        t.params[t.params.length - 1],
        0,
        t.params[4],
        t.params[5],
        0
      ), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c2"
      }, r[h] = {
        startIndex: o.length / 3 - 4,
        previous: !1
      }, r[h + 1] = {
        startIndex: o.length / 3 - 4,
        previous: !0
      }) : t.curve === "quadratic" && (e.push(t.params[2], t.params[3], 0), o.push(
        t.params[0],
        t.params[1],
        0,
        t.params[2],
        t.params[3],
        0,
        t.params[t.params.length - 2],
        t.params[t.params.length - 1],
        0,
        t.params[2],
        t.params[3],
        0
      ), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c1"
      }, r[h] = {
        startIndex: o.length / 3 - 4,
        previous: !1
      }, r[h + 1] = {
        startIndex: o.length / 3 - 4,
        previous: !0
      });
    })) : this.config.type === "Path3" && (this.pathType = 3, this.config.curves.forEach((t, h, p) => {
      h === p.length - 1 ? n.push(
        t.params[0],
        t.params[1],
        t.params[2],
        t.params[t.params.length - 3],
        t.params[t.params.length - 2],
        t.params[t.params.length - 1]
      ) : n.push(t.params[0], t.params[1], t.params[2]), t.curve === "cubic" ? (e.push(t.params[3], t.params[4], t.params[5]), o.push(
        t.params[0],
        t.params[1],
        t.params[2],
        t.params[3],
        t.params[4],
        t.params[5]
      ), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c1"
      }, e.push(t.params[6], t.params[7], t.params[8]), o.push(
        t.params[t.params.length - 3],
        t.params[t.params.length - 2],
        t.params[t.params.length - 1],
        t.params[6],
        t.params[7],
        t.params[8]
      ), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c2"
      }, r[h] = {
        startIndex: o.length / 3 - 4,
        previous: !1
      }, r[h + 1] = {
        startIndex: o.length / 3 - 4,
        previous: !0
      }) : t.curve === "quadratic" && (e.push(t.params[3], t.params[4], t.params[5]), o.push(
        t.params[0],
        t.params[1],
        t.params[2],
        t.params[3],
        t.params[4],
        t.params[5],
        t.params[t.params.length - 3],
        t.params[t.params.length - 2],
        t.params[t.params.length - 1],
        t.params[3],
        t.params[4],
        t.params[5]
      ), a[e.length / 3 - 1] = {
        segmentIndex: h,
        type: "c1"
      }, r[h] = {
        startIndex: o.length / 3 - 4,
        previous: !1
      }, r[h + 1] = {
        startIndex: o.length / 3 - 4,
        previous: !0
      });
    }));
    const c = function(t, h) {
      const p = t.geometry;
      p.setAttribute(
        "position",
        new S(new Float32Array(h), 3).setUsage(
          A
        )
      ), p.getAttribute("position").needsUpdate = !0, p.computeBoundingBox(), p.computeBoundingSphere();
    };
    return c(this.anchorGizmo, n), c(this.moveGizmo, e), c(this.moveHelper, o), this;
  }
  update() {
    this.setConfig(this.config);
  }
  updateHelper(i) {
    const a = this.helperRangeMap;
    if (a[i] !== void 0) {
      const { startIndex: r, previous: n } = a[i], e = n ? this.config.curves[i - 1] : this.config.curves[i], o = this.moveHelper.geometry.getAttribute("position");
      e.curve === "bezier" || e.curve === "cubic" ? this.pathType === 2 ? (o.setXYZ(r, e.params[0], e.params[1], 0), o.setXYZ(
        r + 1,
        e.params[2],
        e.params[3],
        0
      ), o.setXYZ(
        r + 2,
        e.params[e.params.length - 2],
        e.params[e.params.length - 1],
        0
      ), o.setXYZ(
        r + 3,
        e.params[4],
        e.params[5],
        0
      )) : this.pathType === 3 && (o.setXYZ(
        r,
        e.params[0],
        e.params[1],
        e.params[2]
      ), o.setXYZ(
        r + 1,
        e.params[3],
        e.params[4],
        e.params[5]
      ), o.setXYZ(
        r + 2,
        e.params[e.params.length - 3],
        e.params[e.params.length - 2],
        e.params[e.params.length - 1]
      ), o.setXYZ(
        r + 3,
        e.params[6],
        e.params[7],
        e.params[8]
      )) : e.curve === "quadratic" && (this.pathType === 2 ? (o.setXYZ(r, e.params[0], e.params[1], 0), o.setXYZ(
        r + 1,
        e.params[2],
        e.params[3],
        0
      ), o.setXYZ(
        r + 2,
        e.params[e.params.length - 2],
        e.params[e.params.length - 1],
        0
      ), o.setXYZ(
        r + 3,
        e.params[2],
        e.params[3],
        0
      )) : this.pathType === 3 && (o.setXYZ(
        r,
        e.params[0],
        e.params[1],
        e.params[2]
      ), o.setXYZ(
        r + 1,
        e.params[3],
        e.params[4],
        e.params[5]
      ), o.setXYZ(
        r + 2,
        e.params[e.params.length - 3],
        e.params[e.params.length - 2],
        e.params[e.params.length - 1]
      ), o.setXYZ(
        r + 3,
        e.params[3],
        e.params[4],
        e.params[5]
      ))), o.needsUpdate = !0;
    }
    return this;
  }
  use(i) {
    this.pointerManager = i;
  }
  connect() {
    return this.object && this.config && (this.domElement.addEventListener("pointermove", this._pointerHover), this.domElement.addEventListener("mousedown", this._pointerDown)), this;
  }
  disconnect() {
    return this.domElement.removeEventListener("pointermove", this._pointerHover), this.domElement.removeEventListener("mousedown", this._pointerDown), this;
  }
  dispose() {
    const i = (a) => {
      a.geometry.dispose(), Array.isArray(a.material) ? a.material.forEach((r) => {
        r.dispose();
      }) : a.material.dispose();
    };
    i(this.anchorGizmo), i(this.moveGizmo);
  }
  intersectPoint(i) {
    this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera);
    const a = this.raycaster.intersectObject(this, !0);
    return a.length ? (this.currentGuizmo = a[0].object, this.currentIndex = a[0].index, {
      guizmo: this.currentGuizmo,
      index: this.currentIndex,
      point: a[0].point
    }) : null;
  }
  intersectPlane(i) {
    return this.raycaster.setFromCamera(this.pointerManager.mouse, this.camera), this.raycaster.ray.intersectPlane(
      this.plane,
      this.cachePlaneVector3
    );
  }
  pointerHover(i) {
    if (this.dragging || !this.visible)
      return;
    const a = this.intersectPoint(i);
    Number.isInteger(a == null ? void 0 : a.index) ? this.domElement.style.cursor = "move" : this.domElement.style.cursor = "";
  }
  pointerDown(i) {
    if (!this.visible || i.button !== 0)
      return;
    const a = this.intersectPoint(i);
    if (a) {
      this.dragging = !0, this.pathType === 2 ? (this.cacheQuaternion.setFromRotationMatrix(this.object.matrixWorld), this.cacheNormal.set(0, 0, 1).applyQuaternion(this.cacheQuaternion), this.cachePosition.setFromMatrixPosition(this.object.matrixWorld), this.plane.set(
        this.cacheNormal,
        this.cachePosition.projectOnVector(this.cacheNormal).length()
      )) : this.pathType === 3 && (this.camera.getWorldPosition(this.plane.normal).sub(a.point).normalize(), this.plane.constant = (a.point.dot(this.plane.normal) > 0 ? 1 : -1) * a.point.projectOnVector(this.plane.normal).length()), this.cacheMouseDownPoistion.copy(this.intersectPlane(i)).sub(this.cachePosition);
      const r = this.currentIndex === this.config.curves.length ? this.currentIndex - 1 : this.currentIndex;
      this.dispatchEvent({
        type: "mousedown",
        index: r,
        config: this.config,
        last: this.currentIndex === this.config.curves.length,
        object: this.object,
        operate: this.currentGuizmo === this.moveGizmo ? "move" : "anchor"
      }), this.cacheConfigIndex = r, this.domElement.addEventListener("mousemove", this._pointerMove), this.domElement.addEventListener("mouseup", this._pointerUp);
    }
  }
  pointerMove(i) {
    if (!this.visible && !this.dragging)
      return;
    const a = this.intersectPlane(i);
    if (!a)
      return;
    a.sub(this.cachePosition).applyMatrix4(this.cacheObjectInvert), this.cacheMouseMoveDirection.copy(a).sub(this.cacheMouseDownPoistion).normalize();
    const r = this.currentGuizmo, n = this.currentIndex, e = this.config, o = this.cacheConfigIndex;
    if (r === this.anchorGizmo) {
      const c = e.curves.length;
      if (n !== e.curves.length) {
        const p = e.curves[n];
        p.params[0] = a.x, p.params[1] = a.y, this.pathType === 3 && (p.params[2] = a.z), this.updateHelper(n);
      } else {
        const p = e.curves[c - 1];
        this.pathType === 3 ? (p.params[p.params.length - 3] = a.x, p.params[p.params.length - 2] = a.y, p.params[p.params.length - 1] = a.z) : (p.params[p.params.length - 2] = a.x, p.params[p.params.length - 1] = a.y), this.updateHelper(c - 1);
      }
      const t = this.anchorGizmo.geometry.getAttribute("position"), h = t.array;
      h[n * 3] = a.x, h[n * 3 + 1] = a.y, this.pathType === 3 && (h[n * 3 + 2] = a.z), t.needsUpdate = !0, this.dispatchEvent({
        type: "changing",
        index: o,
        config: this.config,
        last: this.currentIndex === this.config.curves.length,
        object: this.object,
        operate: "anchor"
      });
    } else if (r === this.moveGizmo) {
      const c = this.moveCurveIndexMap[n].segmentIndex, t = e.curves[c], h = this.moveCurveIndexMap[n].type;
      h === "c1" ? this.pathType === 2 ? (t.params[2] = a.x, t.params[3] = a.y) : (t.params[3] = a.x, t.params[4] = a.y, t.params[5] = a.z) : h === "c2" && (this.pathType === 2 ? (t.params[4] = a.x, t.params[5] = a.y) : (t.params[6] = a.x, t.params[7] = a.y, t.params[8] = a.z));
      const p = this.moveGizmo.geometry.getAttribute("position"), d = p.array;
      d[n * 3] = a.x, d[n * 3 + 1] = a.y, this.pathType === 3 && (d[n * 3 + 2] = a.z), p.needsUpdate = !0, this.updateHelper(c), this.dispatchEvent({
        type: "changing",
        index: o,
        config: this.config,
        last: this.currentIndex === this.config.curves.length,
        object: this.object,
        operate: "move"
      });
    }
  }
  pointerUp(i) {
    this.dragging = !1, this.domElement.removeEventListener("mousemove", this._pointerMove), this.domElement.removeEventListener("mouseup", this._pointerUp), this.currentGuizmo && (this.currentGuizmo.geometry.computeBoundingSphere(), this.currentGuizmo.geometry.computeBoundingBox()), this.dispatchEvent({
      type: "mouseup",
      index: this.cacheConfigIndex,
      config: this.config,
      last: this.currentIndex === this.config.curves.length,
      object: this.object,
      operate: this.currentGuizmo === this.anchorGizmo ? "anchor" : "move"
    });
  }
};
m.anchorMaterial = new I({
  map: L,
  transparent: !0,
  depthFunc: M,
  alphaTest: 0.01,
  sizeAttenuation: !1,
  size: 15
}), m.moveMaterial = new I({
  map: R,
  transparent: !0,
  depthFunc: M,
  alphaTest: 0.01,
  sizeAttenuation: !1,
  size: 15
}), m.moveHelperMaterial = new D({
  color: "rgb(100, 100, 100)"
});
let f = m;
const O = z(H), j = function(s = {
  raycaster: {
    params: {
      Line: { threshold: 5 },
      Points: { threshold: 5 }
    }
  }
}) {
  let i, a;
  return {
    name: O,
    deps: [...P, w],
    install(r) {
      const n = new f(
        r.camera,
        r.dom
      );
      s.raycaster && s.raycaster.params && Object.assign(n.raycaster.params, s.raycaster.params), n.use(r.pointerManager), r.pathSupportControls = n, a = (e) => {
        n.setDom(e.dom);
      }, i = (e) => {
        n.setCamera(e.camera);
      }, r.addEventListener(u.SETDOM, a), r.addEventListener(u.SETCAMERA, i);
    },
    dispose(r) {
      r.removeEventListener(u.SETDOM, a), r.removeEventListener(u.SETCAMERA, i), r.pathSupportControls.disconnect().dispose(), delete r.pathSupportControls;
    }
  };
};
export {
  O as PATH_SUPPORT_CONTROLS_PLUGIN,
  j as PathSupportControlsPlugin
};
