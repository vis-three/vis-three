import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import {
  getOrthographicCameraConfig,
  OrthographicCameraConfig,
} from "../CameraConfig";
import { OrthographicCamera } from "three";
import { ENGINE_EVENT, SetSizeEvent } from "@vis-three/core";
import { CameraEngineSupport } from "../CameraExtend";

export default defineObjectModel<
  OrthographicCameraConfig,
  OrthographicCamera,
  {
    updateFun: (event: SetSizeEvent) => void;
  },
  CameraEngineSupport
>((objectModel) => ({
  type: "OrthographicCamera",
  config: getOrthographicCameraConfig,
  context({ model }) {
    return {
      updateFun: (event: SetSizeEvent) => {
        const target = model.puppet;
        const width = event.width;
        const height = event.height;
        target.left = -width;
        target.right = width;
        target.top = height;
        target.bottom = -height;
        target.updateProjectionMatrix();
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
    },
  },
  create({ model, config, engine }): OrthographicCamera {
    const camera = new OrthographicCamera(-50, 50, 50, -50);

    objectModel.create!<OrthographicCameraConfig>({
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
