import { transPkgName as p } from "@vis-three/utils";
import { POINTER_MANAGER_PLUGIN as d } from "@vis-three/plugin-pointer-manager";
import { EventDispatcher as l, ENGINE_EVENT as s } from "@vis-three/core";
import { OrthographicCamera as o, Plane as m, Vector3 as a, Mesh as w, PlaneGeometry as h, MeshBasicMaterial as u, Matrix4 as g, Quaternion as r } from "three";
const v = "@vis-three/plugin-path-drawing";
var B = /* @__PURE__ */ ((n) => (n.BEGIN = "begin", n.END = "end", n.WRITE = "write", n.MOVE = "move", n))(B || {});
class P extends l {
  constructor(e) {
    super(), this.camera = new o(
      -window.innerWidth,
      window.innerWidth,
      window.innerHeight,
      -window.innerHeight,
      0,
      1e4
    ), this.plane = new m(new a(0, 0, 1), 0), this.boardOffset = 20, this.drawingBoard = new w(
      new h(150, 150),
      new u({
        transparent: !0,
        opacity: 0.2,
        color: "rgb(64, 255, 242)"
      })
    ), this.relativeMatrixInvert = new g(), this.cachePoint = new a(), this.cacheRelativePoint = new a(), this._tempVector = new a(), this._tempVector2 = new a(), this._tempQuaternion = new r(), this.begun = !1, this.autoPlane = !1, this.setScene = (i) => {
      this.drawingBoard.parent && i.scene.add(this.drawingBoard);
    }, this.cacheBeginWriteFun = (i) => {
      const t = this.engine.pointerManager;
      this.cacheWriteFun(i), t.addEventListener("mousedown", this.cacheWriteFun), t.addEventListener("pointermove", this.cacheMoveFun), t.removeEventListener("mousedown", this.cacheBeginWriteFun), this.begun = !0;
    }, this.cacheWriteFun = (i) => {
      this.autoPlane && this.autoCalcPlane();
      const t = this.engine.pointerManager.intersectPlane(
        this.camera,
        this.plane,
        this.cachePoint
      );
      if (!t) {
        console.warn(
          "path sketcher can not intersect point in this plane and this camera"
        );
        return;
      }
      this.dispatchEvent({
        type: "write",
        point: t,
        relativePoint: this.cacheRelativePoint.copy(t).applyMatrix4(this.relativeMatrixInvert)
      });
    }, this.cacheMoveFun = (i) => {
      this.autoPlane && this.autoCalcPlane();
      const t = this.engine.pointerManager.intersectPlane(
        this.camera,
        this.plane,
        this.cachePoint
      );
      if (!t) {
        console.warn(
          "path sketcher can not intersect point in this plane and this camera"
        );
        return;
      }
      this.dispatchEvent({
        type: "move",
        point: t,
        relativePoint: this.cacheRelativePoint.copy(t).applyMatrix4(this.relativeMatrixInvert)
      });
    }, this.engine = e, this.drawingBoard.raycast = () => {
    }, this.drawingBoard.matrixAutoUpdate = !1, this.setDrawingBoardMatrix(), e.addEventListener(s.SETSCENE, this.setScene);
  }
  autoCalcPlane() {
    const e = this.plane, i = this.camera, t = this._tempVector.set(0, 0, 0), c = this._tempQuaternion;
    e.normal.set(0, 0, 1).applyQuaternion(i.getWorldQuaternion(c)).normalize(), t.set(0, 0, 0).project(i), t.x > 1 || t.x < -1 || t.y > 1 || t.y < -1 || t.z > 1 || t.z < -1 ? e.constant = i.getWorldPosition(t).length() + 50 : e.constant = 0;
  }
  setCamera(e) {
    return this.camera = e, this;
  }
  setAutoPlane(e) {
    return this.autoPlane = e, this;
  }
  setDraingBoardSize(e, i) {
    const t = new h(e, i);
    this.drawingBoard.geometry.copy(t), t.dispose();
  }
  offsetCamera(e) {
    const i = e.length();
    return e.normalize().applyQuaternion(
      new r().setFromUnitVectors(
        new a(0, 1, 0),
        this.plane.normal
      )
    ), this.camera.position.copy(this.plane.normal).multiplyScalar(this.plane.constant).add(e.multiplyScalar(i)), this.camera instanceof o && (this.camera.zoom = (this.camera.top - this.camera.bottom) / (this.drawingBoard.geometry.parameters.height + this.boardOffset)), this.camera.updateProjectionMatrix(), this.drawingBoard.position.add(e), this.drawingBoard.updateMatrix(), this.drawingBoard.updateMatrixWorld(!0), this;
  }
  setRelativeObject(e) {
    return this.relativeMatrixInvert.copy(e.matrixWorld).invert(), this;
  }
  setDrawPlane(e, i = 0) {
    return this.plane.set(e, i), this.setDrawingBoardMatrix(), this;
  }
  setDrawPlaneByFace(e) {
    return this.plane.setFromCoplanarPoints(e.a, e.b, e.c), this.setDrawingBoardMatrix(), this;
  }
  setDrawingBoardMatrix() {
    const e = this.drawingBoard;
    e.position.copy(this.plane.normal).multiplyScalar(this.plane.constant), e.applyQuaternion(
      new r().setFromUnitVectors(
        new a(0, 0, 1),
        this.plane.normal
      )
    ), e.updateMatrix(), e.updateMatrixWorld(!0);
  }
  dispose() {
    this.drawingBoard.removeFromParent(), this.drawingBoard.geometry.dispose(), this.drawingBoard.material.dispose(), this.engine.removeEventListener(s.SETSCENE, this.setScene);
  }
  showDrawingBoard(e) {
    return e ? this.engine.scene.add(this.drawingBoard) : this.engine.scene.remove(this.drawingBoard), this;
  }
  setSketcherByPlane(e = new a(0, 0, 1), i = 0, t = new a(0, 50, 0)) {
    return this.setDrawPlane(e, i).offsetCamera(t);
  }
  setSketcherByFace(e, i = new a(0, 50, 0)) {
    return this.setDrawPlaneByFace(e).offsetCamera(i);
  }
  setSketcherByFaceAndObject(e, i) {
    const t = new a().setFromMatrixPosition(i.matrixWorld);
    return this.setRelativeObject(i), this.setSketcherByFace(e, t);
  }
  changeToDrawingView() {
    return this.engine.setCamera(this.camera), this;
  }
  beginDraw() {
    return this.dispatchEvent({
      type: "begin"
      /* BEGIN */
    }), this.begun = !1, this.engine.pointerManager.addEventListener(
      "mousedown",
      this.cacheBeginWriteFun
    ), this;
  }
  endDraw(e = !0) {
    const i = this.engine.pointerManager;
    return i.removeEventListener("mousedown", this.cacheWriteFun), i.removeEventListener("pointermove", this.cacheMoveFun), this.dispatchEvent({
      type: "end"
      /* END */
    }), e && (this.begun || this.engine.pointerManager.removeEventListener(
      "mousedown",
      this.cacheBeginWriteFun
    ), this.removeEvent(
      "begin"
      /* BEGIN */
    ), this.removeEvent(
      "write"
      /* WRITE */
    ), this.removeEvent(
      "move"
      /* MOVE */
    ), this.removeEvent(
      "end"
      /* END */
    )), this.begun = !1, this;
  }
}
const y = p(v), F = function() {
  return {
    name: y,
    deps: [d],
    install(n) {
      const e = new P(n);
      n.pathSketcher = e;
    },
    dispose(n) {
      n.pathSketcher.dispose(), delete n.pathSketcher;
    }
  };
};
export {
  B as PATHSKETCHER_EVENT,
  y as PATH_DRAWING_PLUGIN,
  F as PathDrawingPlugin,
  P as PathSketcher
};
