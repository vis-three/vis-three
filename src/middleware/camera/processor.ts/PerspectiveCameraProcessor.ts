import { PerspectiveCamera } from "three";
import { defineProcessor } from "../../../core/Processor";
import { SetSizeEvent } from "../../../engine/Engine";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../../object/ObjectProcessor";
import { PerspectiveCameraConfig } from "../CameraConfig";
import { cacheCameraMap } from "./common";

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

    if (config.adaptiveWindow) {
      const fun = (event: SetSizeEvent) => {
        camera.aspect = event.width / event.height;
        camera.updateProjectionMatrix();
      };

      cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);
    }

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

    return camera;
  },
  dispose(camera: PerspectiveCamera) {
    cacheCameraMap.delete(camera);
    objectDispose(camera);
  },
});
