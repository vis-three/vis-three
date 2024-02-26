var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { transPkgName } from "@vis-three/utils";
import { POINTER_MANAGER_PLUGIN } from "@vis-three/plugin-pointer-manager";
import { EventDispatcher, ENGINE_EVENT } from "@vis-three/core";
import { OrthographicCamera, Plane, Vector3, Mesh, PlaneBufferGeometry, MeshBasicMaterial, Matrix4, Quaternion } from "three";
const name = "@vis-three/plugin-path-drawing";
var PATHSKETCHER_EVENT = /* @__PURE__ */ ((PATHSKETCHER_EVENT2) => {
  PATHSKETCHER_EVENT2["BEGIN"] = "begin";
  PATHSKETCHER_EVENT2["END"] = "end";
  PATHSKETCHER_EVENT2["WRITE"] = "write";
  PATHSKETCHER_EVENT2["MOVE"] = "move";
  return PATHSKETCHER_EVENT2;
})(PATHSKETCHER_EVENT || {});
class PathSketcher extends EventDispatcher {
  constructor(engine) {
    super();
    __publicField(this, "camera", new OrthographicCamera(
      -window.innerWidth,
      window.innerWidth,
      window.innerHeight,
      -window.innerHeight,
      0,
      1e4
    ));
    __publicField(this, "plane", new Plane(new Vector3(0, 0, 1), 0));
    __publicField(this, "boardOffset", 20);
    __publicField(this, "drawingBoard", new Mesh(
      new PlaneBufferGeometry(150, 150),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0.2,
        color: "rgb(64, 255, 242)"
      })
    ));
    __publicField(this, "relativeMatrixInvert", new Matrix4());
    __publicField(this, "engine");
    __publicField(this, "cachePoint", new Vector3());
    __publicField(this, "cacheRelativePoint", new Vector3());
    __publicField(this, "_tempVector", new Vector3());
    __publicField(this, "_tempVector2", new Vector3());
    __publicField(this, "_tempQuaternion", new Quaternion());
    __publicField(this, "begun", false);
    __publicField(this, "autoPlane", false);
    __publicField(this, "setScene", (event) => {
      this.drawingBoard.parent && event.scene.add(this.drawingBoard);
    });
    __publicField(this, "cacheBeginWriteFun", (event) => {
      const pointerManager = this.engine.pointerManager;
      this.cacheWriteFun(event);
      pointerManager.addEventListener("mousedown", this.cacheWriteFun);
      pointerManager.addEventListener("pointermove", this.cacheMoveFun);
      pointerManager.removeEventListener("mousedown", this.cacheBeginWriteFun);
      this.begun = true;
    });
    __publicField(this, "cacheWriteFun", (event) => {
      if (this.autoPlane) {
        this.autoCalcPlane();
      }
      const point = this.engine.pointerManager.intersectPlane(
        this.camera,
        this.plane,
        this.cachePoint
      );
      if (!point) {
        console.warn(
          `path sketcher can not intersect point in this plane and this camera`
        );
        return;
      }
      this.dispatchEvent({
        type: "write",
        point,
        relativePoint: this.cacheRelativePoint.copy(point).applyMatrix4(this.relativeMatrixInvert)
      });
    });
    __publicField(this, "cacheMoveFun", (event) => {
      if (this.autoPlane) {
        this.autoCalcPlane();
      }
      const point = this.engine.pointerManager.intersectPlane(
        this.camera,
        this.plane,
        this.cachePoint
      );
      if (!point) {
        console.warn(
          `path sketcher can not intersect point in this plane and this camera`
        );
        return;
      }
      this.dispatchEvent({
        type: "move",
        point,
        relativePoint: this.cacheRelativePoint.copy(point).applyMatrix4(this.relativeMatrixInvert)
      });
    });
    this.engine = engine;
    this.drawingBoard.raycast = () => {
    };
    this.drawingBoard.matrixAutoUpdate = false;
    this.setDrawingBoardMatrix();
    engine.addEventListener(ENGINE_EVENT.SETSCENE, this.setScene);
  }
  autoCalcPlane() {
    const plane = this.plane;
    const camera = this.camera;
    const _tempVector = this._tempVector.set(0, 0, 0);
    const _tempQuaternion = this._tempQuaternion;
    plane.normal.set(0, 0, 1).applyQuaternion(camera.getWorldQuaternion(_tempQuaternion)).normalize();
    _tempVector.set(0, 0, 0).project(camera);
    if (_tempVector.x > 1 || _tempVector.x < -1 || _tempVector.y > 1 || _tempVector.y < -1 || _tempVector.z > 1 || _tempVector.z < -1) {
      plane.constant = camera.getWorldPosition(_tempVector).length() + 50;
    } else {
      plane.constant = 0;
    }
  }
  setCamera(camera) {
    this.camera = camera;
    return this;
  }
  setAutoPlane(status) {
    this.autoPlane = status;
    return this;
  }
  setDraingBoardSize(width, height) {
    const newGeometry = new PlaneBufferGeometry(width, height);
    this.drawingBoard.geometry.copy(newGeometry);
    newGeometry.dispose();
  }
  offsetCamera(offset) {
    const scalar = offset.length();
    offset.normalize().applyQuaternion(
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        this.plane.normal
      )
    );
    this.camera.position.copy(this.plane.normal).multiplyScalar(this.plane.constant).add(offset.multiplyScalar(scalar));
    if (this.camera instanceof OrthographicCamera) {
      this.camera.zoom = (this.camera.top - this.camera.bottom) / (this.drawingBoard.geometry.parameters.height + this.boardOffset);
    }
    this.camera.updateProjectionMatrix();
    this.drawingBoard.position.add(offset);
    this.drawingBoard.updateMatrix();
    this.drawingBoard.updateMatrixWorld(true);
    return this;
  }
  setRelativeObject(object) {
    this.relativeMatrixInvert.copy(object.matrixWorld).invert();
    return this;
  }
  setDrawPlane(normal, constant = 0) {
    this.plane.set(normal, constant);
    this.setDrawingBoardMatrix();
    return this;
  }
  setDrawPlaneByFace(face) {
    this.plane.setFromCoplanarPoints(face.a, face.b, face.c);
    this.setDrawingBoardMatrix();
    return this;
  }
  setDrawingBoardMatrix() {
    const drawingBoard = this.drawingBoard;
    drawingBoard.position.copy(this.plane.normal).multiplyScalar(this.plane.constant);
    drawingBoard.applyQuaternion(
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 0, 1),
        this.plane.normal
      )
    );
    drawingBoard.updateMatrix();
    drawingBoard.updateMatrixWorld(true);
  }
  dispose() {
    this.drawingBoard.removeFromParent();
    this.drawingBoard.geometry.dispose();
    this.drawingBoard.material.dispose();
    this.engine.removeEventListener(ENGINE_EVENT.SETSCENE, this.setScene);
  }
  showDrawingBoard(show) {
    if (show) {
      this.engine.scene.add(this.drawingBoard);
    } else {
      this.engine.scene.remove(this.drawingBoard);
    }
    return this;
  }
  setSketcherByPlane(normal = new Vector3(0, 0, 1), constant = 0, offset = new Vector3(0, 50, 0)) {
    return this.setDrawPlane(normal, constant).offsetCamera(offset);
  }
  setSketcherByFace(face, offset = new Vector3(0, 50, 0)) {
    return this.setDrawPlaneByFace(face).offsetCamera(offset);
  }
  setSketcherByFaceAndObject(face, object) {
    const position = new Vector3().setFromMatrixPosition(object.matrixWorld);
    this.setRelativeObject(object);
    return this.setSketcherByFace(face, position);
  }
  changeToDrawingView() {
    this.engine.setCamera(this.camera);
    return this;
  }
  beginDraw() {
    this.dispatchEvent({
      type: "begin"
    });
    this.begun = false;
    this.engine.pointerManager.addEventListener(
      "mousedown",
      this.cacheBeginWriteFun
    );
    return this;
  }
  endDraw(clearEvent = true) {
    const pointerManager = this.engine.pointerManager;
    pointerManager.removeEventListener("mousedown", this.cacheWriteFun);
    pointerManager.removeEventListener("pointermove", this.cacheMoveFun);
    this.dispatchEvent({
      type: "end"
    });
    if (clearEvent) {
      if (!this.begun) {
        this.engine.pointerManager.removeEventListener(
          "mousedown",
          this.cacheBeginWriteFun
        );
      }
      this.removeEvent("begin");
      this.removeEvent("write");
      this.removeEvent("move");
      this.removeEvent("end");
    }
    this.begun = false;
    return this;
  }
}
const PATH_DRAWING_PLUGIN = transPkgName(name);
const PathDrawingPlugin = function() {
  return {
    name: PATH_DRAWING_PLUGIN,
    deps: [POINTER_MANAGER_PLUGIN],
    install(engine) {
      const pathSketcher = new PathSketcher(engine);
      engine.pathSketcher = pathSketcher;
    },
    dispose(engine) {
      engine.pathSketcher.dispose();
      delete engine.pathSketcher;
    }
  };
};
export { PATHSKETCHER_EVENT, PATH_DRAWING_PLUGIN, PathDrawingPlugin, PathSketcher };
