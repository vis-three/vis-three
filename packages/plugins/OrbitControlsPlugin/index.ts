import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  RenderEvent,
  SetCameraEvent,
  SetDomEvent,
} from "@vis-three/core";
import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";
import { VisOrbitControls } from "./VisOrbitControls";

export * from "./VisOrbitControls";
export interface OrbitControlsEngine extends Engine {
  orbitControls: VisOrbitControls;
}

export const ORBIT_CONTROLS_PLUGIN = transPkgName(pkgname);

export const OrbitControlsPlugin: Plugin<OrbitControlsEngine> = function () {
  let setDomFun: (event: SetDomEvent) => void;
  let setCameraFun: (event: SetCameraEvent) => void;
  let renderFun: (event: RenderEvent) => void;

  return {
    name: ORBIT_CONTROLS_PLUGIN,
    install(engine) {
      const controls = new VisOrbitControls(engine.camera, engine.dom);

      engine.orbitControls = controls;

      setDomFun = (event) => {
        controls.setDom(event.dom);
      };

      engine.addEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);

      setCameraFun = (event) => {
        event.options.orbitControls && controls.setCamera(event.camera);
      };

      engine.addEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      renderFun = () => {
        controls.update();
      };

      engine.addEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
    },
    dispose(engine: Optional<OrbitControlsEngine, "orbitControls">) {
      engine.removeEventListener<SetDomEvent>(ENGINE_EVENT.SETDOM, setDomFun);
      engine.removeEventListener<SetCameraEvent>(
        ENGINE_EVENT.SETCAMERA,
        setCameraFun
      );

      engine.removeEventListener<RenderEvent>(ENGINE_EVENT.RENDER, renderFun);
    },
  };
};
