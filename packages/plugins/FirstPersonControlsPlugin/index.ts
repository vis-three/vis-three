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
import { FirstPersonControls } from "./FirstPersonControls";
import { name as pkgname } from "./package.json";

export interface FirstPersonControlsEngine extends Engine {
  firstPersonControls: FirstPersonControls;
}

export interface FirstPersonControlsParameters {
  /**移动速度 */
  movementSpeed?: number;
  /**转向速度 */
  lookSpeed?: number;

  /**是否能够垂直环视 */
  lookVertical?: boolean;
  /**是否会自动前进 */
  autoForward?: boolean;
  /**是否能够环视四周 */
  activeLook?: boolean;
  /**升高速度 */
  heightSpeed?: boolean;
  /**升高系数 */
  heightCoef?: number;
  /**最低高度 */
  heightMin?: number;
  /**最高高度 */
  heightMax?: number;
}

export const FIRST_PERSON_CONTROLS_PLUGIN = transPkgName(pkgname);

export const FirstPersonControlsPlugin: Plugin<FirstPersonControlsEngine> =
  function (params: FirstPersonControlsParameters = {}) {
    let setDomFun: (event: SetDomEvent) => void;
    let setCameraFun: (event: SetCameraEvent) => void;
    let setSizeFun: (event: SetSizeEvent) => void;
    let renderFun: (event: RenderEvent) => void;

    return {
      name: FIRST_PERSON_CONTROLS_PLUGIN,
      install(engine) {
        const controls = new FirstPersonControls(engine.camera, engine.dom);

        controls.movementSpeed = params.movementSpeed || 1.0;
        controls.lookSpeed = params.lookSpeed || 0.005;
        controls.lookVertical = params.lookVertical || true;
        controls.autoForward = params.autoForward || false;
        controls.activeLook = params.activeLook || true;

        controls.heightSpeed = params.heightSpeed || false;
        controls.heightCoef = params.heightCoef || 1.0;
        controls.heightMin = params.heightMin || 0.0;
        controls.heightMax = params.heightMax || 1.0;

        engine.firstPersonControls = controls;

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

        setSizeFun = (event) => {
          controls.setSize(event.width, event.height);
        };

        engine.addEventListener<SetSizeEvent>(ENGINE_EVENT.SETSIZE, setSizeFun);

        renderFun = (event) => {
          controls.update(event.delta);
        };

        engine.addEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
      dispose(
        engine: Optional<FirstPersonControlsEngine, "firstPersonControls">
      ) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );
        engine.removeEventListener<SetSizeEvent>(
          ENGINE_EVENT.SETSIZE,
          setSizeFun
        );

        engine.removeEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
      },
    };
  };
