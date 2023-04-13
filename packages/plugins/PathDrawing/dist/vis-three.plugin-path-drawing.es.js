var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
import { transPkgName } from "@vis-three/utils";
import { POINTER_MANAGER_PLUGIN } from "@vis-three/plugin-pointer-manager";
import { EventDispatcher } from "@vis-three/core";
import { OrthographicCamera, Plane, Vector3 } from "three";
const name = "@vis-three/plugin-path-drawing";
class PathDrawing extends EventDispatcher {
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
    __publicField(this, "plane", new Plane(new Vector3(0, 1, 0), 0));
  }
  setDrawPlane(normal, constant = 0) {
    this.plane.set(normal, constant);
    return this;
  }
}
const PATH_DRAWING_PLUGIN = transPkgName(name);
const PathDrawingPlugin = function() {
  return {
    name: PATH_DRAWING_PLUGIN,
    deps: [POINTER_MANAGER_PLUGIN],
    install(engine) {
      const pathDrawing = new PathDrawing();
      engine.pathDrawing = pathDrawing;
      engine.drawPath = function() {
        this.setCamera(pathDrawing.camera);
        return this;
      };
      engine.getPathPoint = function(result) {
        return this.pointerManager.intersectPlane(
          pathDrawing.camera,
          pathDrawing.plane,
          result || new Vector3()
        );
      };
    },
    dispose(engine) {
      delete engine.pathDrawing;
      delete engine.drawPath;
      delete engine.getPathPoint;
    }
  };
};
export { PATH_DRAWING_PLUGIN, PathDrawingPlugin };
