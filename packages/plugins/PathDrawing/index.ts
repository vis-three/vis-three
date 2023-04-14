import { ENGINE_EVENT, Engine, Plugin, SetSceneEvent } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import {
  POINTER_MANAGER_PLUGIN,
  PointerManagerEngine,
} from "@vis-three/plugin-pointer-manager";
import { Matrix4, Vector3 } from "three";
import { Face, PathSketcher } from "./PathSketcher";

export interface PathDrawingEngine extends PointerManagerEngine {
  pathSketcher: PathSketcher;
  drawPathByPlane: (
    normal: Vector3,
    constant: number,
    offset: Vector3
  ) => PathDrawingEngine;
  drawPathByFace: (face: Face, offset: Vector3) => PathDrawingEngine;
  getPathPoint: (result?: Vector3) => Vector3 | null;
  getRelativePathPoint: (matrix: Matrix4, result?: Vector3) => Vector3 | null;
}

export const PATH_DRAWING_PLUGIN = transPkgName(pkgname);

export const PathDrawingPlugin: Plugin<PathDrawingEngine> = function () {
  return {
    name: PATH_DRAWING_PLUGIN,
    deps: [POINTER_MANAGER_PLUGIN],
    install(engine) {
      const pathSketcher = new PathSketcher();

      engine.pathSketcher = pathSketcher;

      engine.drawPathByPlane = function (
        normal: Vector3 = new Vector3(0, 0, 1),
        constant: number = 0,
        offset: Vector3 = new Vector3(0, 50, 0)
      ) {
        pathSketcher.setDrawPlane(normal, constant).offsetCamera(offset);
        this.setCamera(pathSketcher.camera);
        return this;
      };

      engine.drawPathByFace = function (
        face,
        offset: Vector3 = new Vector3(0, 50, 0)
      ) {
        pathSketcher.setDrawPlaneByFace(face).offsetCamera(offset);
        this.setCamera(pathSketcher.camera);
        return this;
      };

      engine.getPathPoint = function (result?: Vector3) {
        return this.pointerManager.intersectPlane(
          pathSketcher.camera,
          pathSketcher.plane,
          result || new Vector3()
        );
      };

      engine.getRelativePathPoint = function (matrix, result?: Vector3) {
        const v = this.getPathPoint(result);

        if (!v) {
          return v;
        }

        return v.applyMatrix4(matrix.invert());
      };

      engine.addEventListener(ENGINE_EVENT.SETSCENE, (event: SetSceneEvent) => {
        event.scene.add(pathSketcher.helper);
      });
    },
    dispose(
      engine: Optional<
        PathDrawingEngine,
        | "pathSketcher"
        | "drawPathByPlane"
        | "getPathPoint"
        | "getRelativePathPoint"
      >
    ) {
      engine.pathSketcher!.dispose();
      delete engine.pathSketcher;
      delete engine.drawPathByPlane;
      delete engine.getPathPoint;
      delete engine.getRelativePathPoint;
    },
  };
};
