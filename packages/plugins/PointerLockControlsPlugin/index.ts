import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetDomEvent,
} from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { PointerLockControls } from "./PointerLockControls";

export interface PointerLockControlsEngine extends Engine {
  pointerLockControls: PointerLockControls;
}

export const POINTER_LOCK_CONTROLS_PLUGIN = transPkgName(pkgname);

export const PointerLockControlsPlugin: Plugin<PointerLockControlsEngine> =
  function () {
    let setDomFun: (event: SetDomEvent) => void;
    let setCameraFun: (event: SetCameraEvent) => void;

    return {
      name: POINTER_LOCK_CONTROLS_PLUGIN,
      install(engine) {
        const controls = new PointerLockControls(engine.camera, engine.dom);

        engine.pointerLockControls = controls;

        setDomFun = (event) => {
          controls.setDom(event.dom);
        };

        engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

        setCameraFun = (event) => {
          controls.setCamera(event.camera);
        };

        engine.addEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );
      },
      dispose(
        engine: Optional<PointerLockControlsEngine, "pointerLockControls">
      ) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        engine.pointerLockControls!.dispose();
        delete engine.pointerLockControls;
      },
    };
  };
