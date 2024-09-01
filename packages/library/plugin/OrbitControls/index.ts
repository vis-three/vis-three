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
import { MOUSE } from "three";

export * from "./VisOrbitControls";
export interface OrbitControlsEngine extends Engine {
  orbitControls: VisOrbitControls;
}

export interface OrbitControlsPluginParameters {
  minDistance?: number;
  maxDistance?: number;
  minZoom?: number;
  maxZoom?: number;
  minPolarAngle?: number;
  maxPolarAngle?: number;
  minAzimuthAngle?: number;
  maxAzimuthAngle?: number;
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: number;
  zoomSpeed?: number;
  enableRotate?: boolean;
  rotateSpeed?: number;
  enablePan?: boolean;
  panSpeed?: number;
  screenSpacePanning?: boolean;
  keyPanSpeed?: number;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  keys?: {
    LEFT?: string;
    UP?: string;
    RIGHT?: string;
    BOTTOM?: string;
  };
  keysDom?: HTMLElement;
  mouseButtons?: {
    LEFT?: MOUSE;
    MIDDLE?: MOUSE;
    RIGHT?: MOUSE;
  };
}

export const ORBIT_CONTROLS_PLUGIN = transPkgName(pkgname);

export const OrbitControlsPlugin: Plugin<
  OrbitControlsEngine,
  OrbitControlsPluginParameters
> = function (params = {}) {
  let setDomFun: (event: SetDomEvent) => void;
  let setCameraFun: (event: SetCameraEvent) => void;
  let renderFun: (event: RenderEvent) => void;

  return {
    name: ORBIT_CONTROLS_PLUGIN,
    install(engine) {
      const controls = new VisOrbitControls(engine.camera, engine.dom);

      if (params) {
        for (const key in params) {
          if (params[key] !== undefined) {
            if (key === "keysDom") {
              controls.listenToKeyEvents(params[key]);
              continue;
            }

            if (typeof params[key] === "object") {
              Object.assign(controls[key], params[key]);
            } else {
              controls[key] = params[key];
            }
          }
        }
      }

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
