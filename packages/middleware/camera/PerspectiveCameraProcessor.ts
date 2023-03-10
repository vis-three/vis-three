import { PerspectiveCamera } from "three";
import { defineProcessor } from "../module";
import { SetSizeEvent } from "@vis-three/core";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "../object/ObjectProcessor";
import {
  getPerspectiveCameraConfig,
  PerspectiveCameraConfig,
} from "./CameraConfig";
import { EngineSupport } from "../engine";
import { CameraCompiler } from "./CameraCompiler";

export default defineProcessor<
  PerspectiveCameraConfig,
  PerspectiveCamera,
  EngineSupport,
  CameraCompiler
>({
  type: "PerspectiveCamera",
  config: getPerspectiveCameraConfig,
  commands: {
    add: {
      scale() {},
      ...(<ObjectCommands<PerspectiveCameraConfig, PerspectiveCamera>>(
        objectCommands.add
      )),
    },
    set: {
      scale() {},
      adaptiveWindow({ target, value, engine, compiler }) {
        if (value) {
          if (!compiler.cacheCameraMap.has(value)) {
            const fun = (event: SetSizeEvent) => {
              target.aspect = event.width / event.height;
              target.updateProjectionMatrix();
            };

            compiler.cacheCameraMap.set(target, fun);
            engine.addEventListener("setSize", fun);

            fun({
              type: "setSize",
              width: engine.dom!.offsetWidth,
              height: engine.dom!.offsetHeight,
            });
          }
        } else {
          const fun = compiler.cacheCameraMap.get(target);
          if (fun) {
            engine.removeEventListener("setSize", fun);
            compiler.cacheCameraMap.delete(target);
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
  create(config, engine, compiler): PerspectiveCamera {
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

      compiler.cacheCameraMap.set(camera, fun);
      engine.addEventListener("setSize", fun);

      fun({
        type: "setSize",
        width: engine.dom!.offsetWidth,
        height: engine.dom!.offsetHeight,
      });
    }

    return camera;
  },
  dispose(camera, engine, compiler) {
    compiler.cacheCameraMap.delete(camera);
    objectDispose(camera);
  },
});
