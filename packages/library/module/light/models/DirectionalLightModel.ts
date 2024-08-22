import { DirectionalLight } from "three";
import {
  DirectionalLightConfig,
  getDirectionalLightConfig,
} from "../LightConfig";
import { defineLightModel, LightModel } from "./LightModel";

export default defineLightModel<DirectionalLightConfig, DirectionalLight>(
  (lightModel) => ({
    type: "DirectionalLight",
    config: getDirectionalLightConfig,
    create({ model, config, engine }) {
      const light = new DirectionalLight();

      lightModel.create!({
        model: model as unknown as LightModel,
        light,
        config,
        filter: {},
        engine,
        shadow: true,
      });

      return light;
    },

    dispose({ target }) {
      lightModel.dispose!(target);
    },
  })
);
