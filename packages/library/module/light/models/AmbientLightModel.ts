import { AmbientLight } from "three";
import { AmbientLightConfig, getAmbientLightConfig } from "../LightConfig";
import { defineLightModel, LightModel } from "./LightModel";

export default defineLightModel<AmbientLightConfig, AmbientLight>(
  (lightModel) => ({
    type: "AmbientLight",
    config: getAmbientLightConfig,
    create({ model, config, engine }) {
      const light = new AmbientLight();

      lightModel.create!({
        model: model as unknown as LightModel,
        light,
        config,
        filter: {},
        engine,
        shadow: false,
      });

      return light;
    },

    dispose({ target }) {
      lightModel.dispose!(target);
    },
  })
);
