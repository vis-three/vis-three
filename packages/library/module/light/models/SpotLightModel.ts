import { PointLight, SpotLight, Object3D } from "three";
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
    if(config.target){
      light.target = engine.getObject3D(config.target) as Object3D;
    }

    lightModel.create!({
      model: model as unknown as LightModel,
      light,
      config,
      filter: {target: true},
      engine,
      shadow: true,
    });

    return light;
  },

  dispose({ target }) {
    lightModel.dispose!(target);
  },
}));
