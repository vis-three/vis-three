import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  RenderEvent,
  SetCameraEvent,
  SetDomEvent,
  SetSizeEvent,
} from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { KeyboardMoveControls } from "./KeyboardMoveControls";
import { name as pkgname } from "./package.json";

export interface KeyboardMoveControlsEngine extends Engine {
  keyboardMoveControls: KeyboardMoveControls;
}

export interface FirstPersonControlsParameters {
  movementSpeed?: number;
}

export const KEYBOARD_MOVE_CONTROLS_PLUGIN = transPkgName(pkgname);

export const KeyboardMoveControlsPlugin: Plugin<KeyboardMoveControlsEngine> =
  function (params: FirstPersonControlsParameters = {}) {
    let setDomFun: (event: SetDomEvent) => void;
    let setCameraFun: (event: SetCameraEvent) => void;
    let renderFun: (event: RenderEvent) => void;

    return {
      name: KEYBOARD_MOVE_CONTROLS_PLUGIN,
      install(engine) {
        const controls = new KeyboardMoveControls(engine.camera, engine.dom);

        controls.movementSpeed = params.movementSpeed || 1.0;

        engine.keyboardMoveControls = controls;

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

        renderFun = (event) => {
          controls.update(event.delta);
        };

        engine.addEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
      dispose(
        engine: Optional<KeyboardMoveControlsEngine, "keyboardMoveControls">
      ) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        engine.removeEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
    };
  };
