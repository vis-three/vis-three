import { PointLight, SpotLight, Object3D } from "three";
import { defineLightModel, LightModel } from "./LightModel";
import {
  getPointLightConfig,
  getSpotLightConfig,
  PointLightConfig,
  SpotLightConfig,
} from "../LightConfig";

export default defineLightModel<
  SpotLightConfig,
  SpotLight,
  {
    virtualTarget: Object3D;
  }
>((lightModel) => ({
  type: "SpotLight",
  config: getSpotLightConfig,
  context() {
    return {
      virtualTarget: new Object3D(),
    };
  },
  create({ model, config, engine }) {
    const light = new SpotLight();

    light.target = model.virtualTarget;

    if (config.target) {
      if (typeof config.target === "string") {
        model.toTrigger("object", (immediate) => {
          const targetObject = engine.getObject3D(config.target as string);

          if (!targetObject) {
            if (!immediate) {
              console.error(
                "SpotLight model: can not found vid object in engine",
                config.target
              );
            }
            return false;
          } else {
            light.target = targetObject;
            return true;
          }
        });
      } else {
        model.virtualTarget.position.set(
          config.target.x,
          config.target.y,
          config.target.z
        );
      }
    }

    lightModel.create!({
      model: model as unknown as LightModel,
      light,
      config,
      filter: { target: true },
      engine,
      shadow: true,
    });

    return light;
  },

  dispose({ model, target }) {
    target.target = model.virtualTarget;
    lightModel.dispose!(target);
  },
}));
