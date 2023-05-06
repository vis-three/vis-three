import {
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetDomEvent,
} from "@vis-three/core";
import {
  EngineSupport,
  PLUGINS,
  POINTER_MANAGER_PLUGIN,
} from "@vis-three/middleware";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { PathSupportControls } from "./PathSupportControls";
import { PerspectiveCamera } from "three";

export interface PathSupportControlsEngine extends EngineSupport {
  pathSupportControls: PathSupportControls;
}

export const PATH_SUPPORT_CONTROLS_PLUGIN = transPkgName(pkgname);

export const PathSupportControlsPlugin: Plugin<
  PathSupportControlsEngine,
  object
> = function () {
  let setCameraFun: (event: SetCameraEvent) => void;
  let setDomFun: (event: SetDomEvent) => void;

  return {
    name: PATH_SUPPORT_CONTROLS_PLUGIN,
    deps: [...PLUGINS, POINTER_MANAGER_PLUGIN],
    install(engine) {
      const controls = new PathSupportControls(
        engine.camera as PerspectiveCamera,
        engine.dom
      );

      controls.use(engine.pointerManager);

      engine.pathSupportControls = controls;

      setDomFun = (event) => {
        controls.setDom(event.dom);
      };

      setCameraFun = (event) => {
        controls.setCamera(event.camera as PerspectiveCamera);
      };

      engine.addEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
    },
    dispose(
      engine: Optional<PathSupportControlsEngine, "pathSupportControls">
    ) {
      engine.removeEventListener(ENGINE_EVENT.SETDOM, setDomFun);
      engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);

      engine.pathSupportControls!.disconnect().dispose();

      delete engine.pathSupportControls;
    },
  };
};
