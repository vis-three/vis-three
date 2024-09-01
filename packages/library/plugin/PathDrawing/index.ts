import { ENGINE_EVENT, Engine, Plugin, SetSceneEvent } from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import {
  POINTER_MANAGER_PLUGIN,
  PointerManagerEngine,
} from "@vis-three/plugin-pointer-manager";
import { Matrix4, Vector3 } from "three";
import {
  Face,
  MoveEvent,
  PathSketcher,
  PATHSKETCHER_EVENT,
} from "./PathSketcher";

export interface PathDrawingEngine extends PointerManagerEngine {
  pathSketcher: PathSketcher;
  drawPathByPlane: (
    normal: Vector3,
    constant: number,
    offset: Vector3
  ) => PathDrawingEngine;
  drawPathByFace: (face: Face, offset: Vector3) => PathDrawingEngine;
}

export * from "./PathSketcher";

export const PATH_DRAWING_PLUGIN = transPkgName(pkgname);

export const PathDrawingPlugin: Plugin<PathDrawingEngine, object> =
  function () {
    return {
      name: PATH_DRAWING_PLUGIN,
      deps: [POINTER_MANAGER_PLUGIN],
      install(engine) {
        const pathSketcher = new PathSketcher(engine);

        engine.pathSketcher = pathSketcher;
      },
      dispose(engine: Optional<PathDrawingEngine, "pathSketcher">) {
        engine.pathSketcher!.dispose();
        delete engine.pathSketcher;
      },
    };
  };
