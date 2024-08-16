import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import {
  getPerspectiveCameraConfig,
  PerspectiveCameraConfig,
} from "../CameraConfig";
import { PerspectiveCamera } from "three";
import { ENGINE_EVENT, SetSizeEvent } from "@vis-three/core";
import { CameraEngineSupport } from "../CameraExtend";

export default defineObjectModel<
  PerspectiveCameraConfig,
  PerspectiveCamera,
  {
    updateFun: (event: SetSizeEvent) => void;
  },
  CameraEngineSupport
>((objectModel) => ({
  type: "PerspectiveCamera",
  config: getPerspectiveCameraConfig,
  context({ model }) {
    return {
      updateFun: (event: SetSizeEvent) => {
        model.puppet.aspect = event.width / event.height;
        model.puppet.updateProjectionMatrix();
      },
    };
  },
  commands: {
    add: {
      scale() {},
    },
    set: {
      scale() {},
      adaptiveWindow({ model, value, engine }) {
        if (value) {
          engine.addEventListener(ENGINE_EVENT.SETSIZE, model.updateFun);

          model.updateFun({
            type: "setSize",
            width: engine.dom!.offsetWidth,
            height: engine.dom!.offsetHeight,
          });
        } else {
          engine.removeEventListener(ENGINE_EVENT.SETSIZE, model.updateFun);
        }
      },
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
    },
  },
  create({ model, config, engine, compiler }): PerspectiveCamera {
    const camera = new PerspectiveCamera();

    objectModel.create!<PerspectiveCameraConfig>({
      model: model as unknown as ObjectModel,
      target: camera,
      config,
      filter: {
        scale: true,
        adaptiveWindow: true,
      },
      engine,
    });

    camera.updateProjectionMatrix();

    if (config.adaptiveWindow) {
      engine.addEventListener(ENGINE_EVENT.SETSIZE, model.updateFun);

      model.updateFun({
        type: ENGINE_EVENT.SETSIZE,
        width: engine.dom!.offsetWidth,
        height: engine.dom!.offsetHeight,
      });
    }

    return camera;
  },
  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
