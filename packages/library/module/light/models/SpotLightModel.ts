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

    let lightModelObj = {
      model: model as unknown as LightModel,
      light,
      config,
      filter: {target: true},
      engine,
      shadow: true,
    }

    if(config.target){
      model.toTrigger("object", () => {
        light.target = engine.getObject3D(config.target) as Object3D;
        lightModelObj.light = light;
        lightModel.create!(lightModelObj);
      })
    }else{
      lightModel.create!(lightModelObj);
    }

    return light;
  },

  dispose({ target }) {
    lightModel.dispose!(target);
  },
}));
