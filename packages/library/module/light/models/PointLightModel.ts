import { PointLight } from "three";
import { defineLightModel, LightModel } from "./LightModel";
import { getPointLightConfig, PointLightConfig } from "../LightConfig";

export default defineLightModel<PointLightConfig, PointLight>((lightModel) => ({
  type: "PointLight",
  config: getPointLightConfig,
  create({ model, config, engine }) {
    const light = new PointLight();

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
