import { PerspectiveCamera } from "three";
import { defineProcessor } from "../../module";
import { SetSizeEvent } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { PerspectiveCameraConfig } from "../CameraConfig";
import { cacheCameraMap } from "./common";
import { EngineSupport } from "../../engine";

export default defineProcessor<PerspectiveCameraConfig, PerspectiveCamera>({
  configType: CONFIGTYPE.PERSPECTIVECAMERA,
  commands: {
    add: {
      scale() {},
      ...(<ObjectCommands<PerspectiveCameraConfig, PerspectiveCamera>>(
        objectCommands.add
      )),
    },
    set: {
      scale() {},
      adaptiveWindow({ target, value, engine }) {
        if (value) {
          if (!cacheCameraMap.has(value)) {
            const fun = (event: SetSizeEvent) => {
              target.aspect = event.width / event.height;
              target.updateProjectionMatrix();
            };

            cacheCameraMap.set(target, fun);
            engine.addEventListener("setSize", fun);

            fun({
              type: "setSize",
              width: engine.dom!.offsetWidth,
              height: engine.dom!.offsetHeight,
            });
          }
        } else {
          const fun = cacheCameraMap.get(target);
          if (fun) {
            engine.removeEventListener("setSize", fun);
            cacheCameraMap.delete(target);
          }
        }
      },
      ...(<ObjectCommands<PerspectiveCameraConfig, PerspectiveCamera>>(
        objectCommands.set
      )),
      $reg: [
        {
          reg: new RegExp("fov|aspect|near|far"),
          handler({ target, key, value }) {
            target[key] = value;
            target.updateProjectionMatrix();
          },
        },
      ],
    },
    delete: {
      scale() {},
      ...(<ObjectCommands<PerspectiveCameraConfig, PerspectiveCamera>>(
        objectCommands.delete
      )),
    },
  },
  create(
    config: PerspectiveCameraConfig,
    engine: EngineSupport
  ): PerspectiveCamera {
    const camera = new PerspectiveCamera();

    objectCreate(
      camera,
      config,
      {
        scale: true,
        adaptiveWindow: true,
      },
      engine
    );

    camera.updateProjectionMatrix();

    if (config.adaptiveWindow) {
      const fun = (event: SetSizeEvent) => {
        camera.aspect = event.width / event.height;
        camera.updateProjectionMatrix();
      };

      cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);

      fun({
        type: "setSize",
        width: engine.dom!.offsetWidth,
        height: engine.dom!.offsetHeight,
      });
    }

    return camera;
  },
  dispose(camera: PerspectiveCamera) {
    cacheCameraMap.delete(camera);
    objectDispose(camera);
  },
});
