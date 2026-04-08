import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { getLoadObject3DConfig, LoadObject3DConfig } from "../Object3DConfig";
import { Object3D } from "three";

export default defineObjectModel<LoadObject3DConfig, Object3D>(
  (objectModel) => ({
    type: "LoadObject3D",
    config: getLoadObject3DConfig,
    commands: {
      set: {
        //TODO:
        url() {},
        //TODO:
        raw() {},
      },
    },
    create({ model, config, engine }) {
      //TODO: config.raw
      const object =
        engine.resourceManager.resourceMap.get(config.url) || new Object3D();

      objectModel.create!({
        model: model as unknown as ObjectModel,
        target: object,
        config,
        filter: {},
        engine,
      });

      return object;
    },
    dispose({ target }) {
      objectModel.dispose!({ target });
    },
  }),
);
