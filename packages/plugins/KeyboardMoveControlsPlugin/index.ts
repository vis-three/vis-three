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
import { Object3D, Vector3 } from "three";
import {
  AfterUpdateEvent,
  BeforeUpdateEvent,
  KeyboardMoveControls,
} from "./KeyboardMoveControls";
import { name as pkgname } from "./package.json";

export interface KeyboardMoveControlsEngine extends Engine {
  keyboardMoveControls: KeyboardMoveControls;
}

export interface FirstPersonControlsParameters {
  target?: Object3D;
  movementSpeed?: number;
  quickenSpeed?: number;
  space?: "local" | "world";
  forwrad?: Vector3 | ((object: Object3D) => Vector3);
  extendKeyDown?: (event: KeyboardEvent) => void;
  extendKeyUp?: (event: KeyboardEvent) => void;
  beforeUpdate?: (event: BeforeUpdateEvent) => void;
  afterUpdate?: (event: AfterUpdateEvent) => void;
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
        const controls = new KeyboardMoveControls(
          params.target || engine.camera,
          engine.dom
        );
        params.movementSpeed && (controls.movementSpeed = params.movementSpeed);
        params.quickenSpeed && (controls.quickenSpeed = params.quickenSpeed);
        params.space && (controls.space = params.space);
        params.forwrad && (controls.forwrad = params.forwrad);
        params.extendKeyDown && (controls.extendKeyDown = params.extendKeyDown);
        params.extendKeyUp && (controls.extendKeyUp = params.extendKeyUp);

        if (params.beforeUpdate) {
          controls.addEventListener<BeforeUpdateEvent>(
            "beforeUpdate",
            params.beforeUpdate
          );
        }

        if (params.afterUpdate) {
          controls.addEventListener<AfterUpdateEvent>(
            "afterUpdate",
            params.afterUpdate
          );
        }

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
        if (params.beforeUpdate) {
          engine.keyboardMoveControls!.removeEventListener<BeforeUpdateEvent>(
            "beforeUpdate",
            params.beforeUpdate
          );
        }

        if (params.afterUpdate) {
          engine.keyboardMoveControls!.removeEventListener<AfterUpdateEvent>(
            "afterUpdate",
            params.afterUpdate
          );
        }

        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        engine.removeEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
    };
  };
