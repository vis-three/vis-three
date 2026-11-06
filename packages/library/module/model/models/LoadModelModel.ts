import { defineObjectModel, ObjectModel } from "@vis-three/module-object";
import { Object3D } from "three";
import { getLoadModelConfig, LoadModelConfig } from "../ModelConfig";
import { createModel, Model } from "../extends/Model";

export default defineObjectModel<LoadModelConfig, Model>((objectModel) => ({
  type: "LoadModel",
  config: getLoadModelConfig,
  commands: {
    set: {
      //TODO:
      url() {},
      //TODO:
      raw() {},
    },
  },
  create({ model, config, engine }) {
    const object =
      engine.resourceManager.resourceMap.get(config.url) || new Object3D();

    //TODO: config.raw
    const loadModel = createModel(object, config.raw);

    objectModel.create!({
      model: model as unknown as ObjectModel,
      target: loadModel,
      config,
      filter: {},
      engine,
    });

    return loadModel;
  },
  dispose({ target }) {
    objectModel.dispose!({ target });
  },
}));
