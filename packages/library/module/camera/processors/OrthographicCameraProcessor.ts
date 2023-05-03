import { OrthographicCamera } from "three";
import { SetSizeEvent } from "@vis-three/core";
import {
  getOrthographicCameraConfig,
  OrthographicCameraConfig,
} from "../CameraConfig";
import { CameraCompiler } from "../CameraCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  ObjectCommands,
  objectCommands,
  objectCreate,
  objectDispose,
} from "@vis-three/module-object";

export default defineProcessor<
  OrthographicCameraConfig,
  OrthographicCamera,
  EngineSupport,
  CameraCompiler
>({
  type: "OrthographicCamera",
  config: getOrthographicCameraConfig,
  commands: {
    add: {
      scale() {},
      ...(<ObjectCommands<OrthographicCameraConfig, OrthographicCamera>>(
        objectCommands.add
      )),
    },
    set: {
      scale() {},
      adaptiveWindow({ target, value, engine, compiler }) {
        if (value) {
          if (!compiler.cacheCameraMap.has(value)) {
            const fun = (event: SetSizeEvent) => {
              const width = event.width;
              const height = event.height;
              target.left = -width;
              target.right = width;
              target.top = height;
              target.bottom = -height;
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
  create(config, engine, compiler): OrthographicCamera {
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
