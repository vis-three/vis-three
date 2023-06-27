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

export interface KeyboardMoveControlsParameters {
  /**被控制目标物体 */
  target?: Object3D;
  /**物体移动速度 */
  movementSpeed?: number;
  /**物体加速时的速度 */
  quickenSpeed?: number;
  /**移动方向是基于物体矩阵还是世界矩阵 */
  space?: "local" | "world";
  /**物体的正前方朝向，可以通过方法获取 */
  forwrad?: Vector3 | ((object: Object3D) => Vector3);
  /**扩展的键盘按下时的方法 */
  extendKeyDown?: (event: KeyboardEvent) => void;
  /**扩展的键盘抬起的方法 */
  extendKeyUp?: (event: KeyboardEvent) => void;
  /**在物体位置更新前的扩展处理方法 */
  beforeUpdate?: (event: BeforeUpdateEvent) => void;
  /**在物体位置更新后的扩展处理方法 */
  afterUpdate?: (event: AfterUpdateEvent) => void;
}

export const KEYBOARD_MOVE_CONTROLS_PLUGIN = transPkgName(pkgname);

export const KeyboardMoveControlsPlugin: Plugin<KeyboardMoveControlsEngine> =
  function (params: KeyboardMoveControlsParameters = {}) {
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
