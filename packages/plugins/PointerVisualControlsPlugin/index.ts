import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetDomEvent,
} from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { MOUSE_BUTTON, PointerVisualControls } from "./PointerVisualControls";

export * from "./PointerVisualControls";

export interface PointerVisualControlsEngine extends Engine {
  pointerVisualControls: PointerVisualControls;
}

export interface PointerLockControlsPluginParams {
  pointerButton?: MOUSE_BUTTON;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  pointerSpeed?: number;
}

export const POINTER_VISUAL_CONTROLS_PLUGIN = transPkgName(pkgname);

export const PointerVisualControlsPlugin: Plugin<PointerVisualControlsEngine> =
  function (params: PointerLockControlsPluginParams = {}) {
    let setDomFun: (event: SetDomEvent) => void;
    let setCameraFun: (event: SetCameraEvent) => void;

    return {
      name: POINTER_VISUAL_CONTROLS_PLUGIN,
      install(engine) {
        const controls = new PointerVisualControls(engine.camera, engine.dom);

        for (const key in params) {
          if (typeof controls[key] !== "undefined") {
            controls[key] = params[key];
          }
        }

        engine.pointerVisualControls = controls;

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
        engine: Optional<PointerVisualControlsEngine, "pointerVisualControls">
      ) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        engine.pointerVisualControls!.dispose();
        delete engine.pointerVisualControls;
      },
    };
  };
