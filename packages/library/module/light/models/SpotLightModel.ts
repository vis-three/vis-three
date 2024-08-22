import { PointLight, SpotLight } from "three";
import { defineLightModel, LightModel } from "./LightModel";
import {
  getPointLightConfig,
  getSpotLightConfig,
  PointLightConfig,
  SpotLightConfig,
} from "../LightConfig";

export default defineLightModel<SpotLightConfig, SpotLight>((lightModel) => ({
  type: "SpotLight",
  config: getSpotLightConfig,
  create({ model, config, engine }) {
    const light = new SpotLight();

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
}));
