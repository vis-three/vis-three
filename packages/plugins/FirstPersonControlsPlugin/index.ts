import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetDomEvent,
} from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { FirstPersonControls } from "./FirstPersonControls";
import { name as pkgname } from "./package.json";

export interface FirstPersonControlsEngine extends Engine {
  firstPersonControls: FirstPersonControls;
}

export const FIRST_PERSON_CONTROLS_PLUGIN = transPkgName(pkgname);

export const FirstPersonControlsPlugin: Plugin<FirstPersonControlsEngine> =
  function () {
    let setDomFun: (event: SetDomEvent) => void;
    let setCameraFun: (event: SetCameraEvent) => void;

    let cacheRender: () => void;
    return {
      name: FIRST_PERSON_CONTROLS_PLUGIN,
      install(engine) {
        const controls = new FirstPersonControls(engine.camera, engine.dom);

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

        cacheRender = engine.render;

        engine.render = function () {
          cacheRender();
          controls.update(1000 / 60);
        };
      },
      dispose(
        engine: Optional<FirstPersonControlsEngine, "firstPersonControls">
      ) {
        engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
        engine.removeEventListener<SetCameraEvent>(
          ENGINE_EVENT.SETCAMERA,
          setCameraFun
        );

        engine.render = cacheRender;
      },
    };
  };
