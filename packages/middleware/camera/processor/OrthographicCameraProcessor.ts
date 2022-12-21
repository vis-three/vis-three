import { OrthographicCamera } from "three";
import { SetSizeEvent } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { OrthographicCameraConfig } from "../CameraConfig";
import { defineProcessor } from "../../module";

import { cacheCameraMap } from "./common";
import { EngineSupport } from "../../engine";

export default defineProcessor<
  OrthographicCameraConfig,
  OrthographicCamera,
  EngineSupport
>({
  configType: CONFIGTYPE.ORTHOGRAPHICCAMERA,
  commands: {
    add: {
      scale() {},
      ...(<ObjectCommands<OrthographicCameraConfig, OrthographicCamera>>(
        objectCommands.add
      )),
    },
    set: {
      scale() {},
      adaptiveWindow({ target, value, engine }) {
        if (value) {
          if (!cacheCameraMap.has(value)) {
            const fun = (event: SetSizeEvent) => {
              const width = event.width;
              const height = event.height;
              target.left = -width;
              target.right = width;
              target.top = height;
              target.bottom = -height;
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
      ...(<ObjectCommands<OrthographicCameraConfig, OrthographicCamera>>(
        objectCommands.set
      )),
      $reg: [
        {
          reg: new RegExp("left|right|top|bottom|near|far|zoom"),
          handler({ target, key, value }) {
            target[key] = value;
            target.updateProjectionMatrix();
          },
        },
      ],
    },
    delete: {
      scale() {},
      ...(<ObjectCommands<OrthographicCameraConfig, OrthographicCamera>>(
        objectCommands.delete
      )),
    },
  },
  create(
    config: OrthographicCameraConfig,
    engine: EngineSupport
  ): OrthographicCamera {
    const camera = new OrthographicCamera(-50, 50, 50, -50);

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
        const width = event.width;
        const height = event.height;
        camera.left = -width;
        camera.right = width;
        camera.top = height;
        camera.bottom = -height;
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
  dispose(camera: OrthographicCamera) {
    cacheCameraMap.delete(camera);
    objectDispose(camera);
  },
});
