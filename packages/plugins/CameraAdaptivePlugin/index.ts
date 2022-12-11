import {
  Engine,
  ENGINE_EVENT,
  Plugin,
  SetCameraEvent,
  SetSizeEvent,
} from "@vis-three/core";
import { Camera, OrthographicCamera, PerspectiveCamera } from "three";

export const CameraAdaptivePlugin: Plugin<Engine> = function () {
  let setSizeFun: (event: SetSizeEvent) => void;
  let setCameraFun: (event: SetCameraEvent) => void;

  return {
    name: "CameraAdaptivePlugin",
    install(engine) {
      const adaptive = (camera: Camera, width: number, height: number) => {
        if (camera instanceof PerspectiveCamera) {
          camera.aspect = width / height;
          camera.updateProjectionMatrix();
        } else if (camera instanceof OrthographicCamera) {
          camera.left = -width;
          camera.right = width;
          camera.top = height;
          camera.bottom = -height;
          camera.updateProjectionMatrix();
        }
      };

      setSizeFun = (event) => {
        adaptive(engine.camera, event.width, event.height);
      };

      engine.addEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);

      setCameraFun = (event) => {
        adaptive(
          engine.camera,
          engine.dom.offsetWidth,
          engine.dom.offsetHeight
        );
      };

      engine.addEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
    },
    dispose(engine) {
      engine.removeEventListener(ENGINE_EVENT.SETSIZE, setSizeFun);
      engine.removeEventListener(ENGINE_EVENT.SETCAMERA, setCameraFun);
    },
  };
};
