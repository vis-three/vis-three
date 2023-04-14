var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { EventDispatcher, ENGINE_EVENT } from "@vis-three/core";
import { transPkgName } from "@vis-three/utils";
import { POINTER_MANAGER_PLUGIN } from "@vis-three/plugin-pointer-manager";
import { OrthographicCamera, Plane, Vector3, Mesh, PlaneBufferGeometry, MeshBasicMaterial, Quaternion } from "three";
const name = "@vis-three/plugin-path-drawing";
class PathSketcher extends EventDispatcher {
  constructor() {
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
    __publicField(this, "helper", new Mesh(
      new PlaneBufferGeometry(150, 150),
      new MeshBasicMaterial({
        transparent: true,
        opacity: 0.2,
        color: "rgb(64, 255, 242)"
      })
    ));
    this.helper.raycast = () => {
    };
    this.helper.matrixAutoUpdate = false;
    this.setHelperMatrix();
  }
  offsetCamera(offset) {
    offset.normalize().applyQuaternion(
      new Quaternion().setFromUnitVectors(
        new Vector3(0, 1, 0),
        this.plane.normal
      )
    );
    this.camera.position.copy(this.plane.normal).multiplyScalar(this.plane.constant).add(offset);
    this.helper.position.add(offset);
    this.helper.updateMatrix();
    this.helper.updateMatrixWorld(true);
  }
  setDrawPlane(normal, constant = 0) {
    this.plane.set(normal, constant);
    this.setHelperMatrix();
    return this;
  }
  setDrawPlaneByFace(face) {
    this.plane.setFromCoplanarPoints(face.a, face.b, face.c);
    this.setHelperMatrix();
    return this;
  }
  setHelperMatrix() {
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
const PATH_DRAWING_PLUGIN = transPkgName(name);
const PathDrawingPlugin = function() {
  return {
    name: PATH_DRAWING_PLUGIN,
    deps: [POINTER_MANAGER_PLUGIN],
    install(engine) {
      const pathSketcher = new PathSketcher();
      engine.pathSketcher = pathSketcher;
      engine.drawPathByPlane = function(normal = new Vector3(0, 0, 1), constant = 0, offset = new Vector3(0, 50, 0)) {
        pathSketcher.setDrawPlane(normal, constant).offsetCamera(offset);
        this.setCamera(pathSketcher.camera);
        return this;
      };
      engine.drawPathByFace = function(face, offset = new Vector3(0, 50, 0)) {
        pathSketcher.setDrawPlaneByFace(face).offsetCamera(offset);
        this.setCamera(pathSketcher.camera);
        return this;
      };
      engine.getPathPoint = function(result) {
        return this.pointerManager.intersectPlane(
          pathSketcher.camera,
          pathSketcher.plane,
          result || new Vector3()
        );
      };
      engine.getRelativePathPoint = function(matrix, result) {
        const v = this.getPathPoint(result);
        if (!v) {
          return v;
        }
        return v.applyMatrix4(matrix.invert());
      };
      engine.addEventListener(ENGINE_EVENT.SETSCENE, (event) => {
        event.scene.add(pathSketcher.helper);
      });
    },
    dispose(engine) {
      engine.pathSketcher.dispose();
      delete engine.pathSketcher;
      delete engine.drawPathByPlane;
      delete engine.getPathPoint;
      delete engine.getRelativePathPoint;
    }
  };
};
export { PATH_DRAWING_PLUGIN, PathDrawingPlugin };
