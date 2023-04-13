import { Engine, Plugin } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import {
  POINTER_MANAGER_PLUGIN,
  PointerManagerEngine,
} from "@vis-three/plugin-pointer-manager";
import { PathDrawing } from "./PathDrawing";
import { Vector3 } from "three";

export interface PathDrawingEngine extends PointerManagerEngine {
  pathDrawing: PathDrawing;
  drawPath: () => PathDrawingEngine;
  getPathPoint: (result?: Vector3) => Vector3 | null;
}

export const PATH_DRAWING_PLUGIN = transPkgName(pkgname);

export const PathDrawingPlugin: Plugin<PathDrawingEngine> = function () {
  return {
    name: PATH_DRAWING_PLUGIN,
    deps: [POINTER_MANAGER_PLUGIN],
    install(engine) {
      const pathDrawing = new PathDrawing();

      engine.pathDrawing = pathDrawing;

      engine.drawPath = function (offset: Vector3 = new Vector3(0, 50, 0)) {
        this.setCamera(pathDrawing.camera);
        return this;
      };

      engine.getPathPoint = function (result?: Vector3) {
        return this.pointerManager.intersectPlane(
          pathDrawing.camera,
          pathDrawing.plane,
          result || new Vector3()
        );
      };
    },
    dispose(
      engine: Optional<
        PathDrawingEngine,
        "pathDrawing" | "drawPath" | "getPathPoint"
      >
    ) {
      delete engine.pathDrawing;
      delete engine.drawPath;
      delete engine.getPathPoint;
    },
  };
};
