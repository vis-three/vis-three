import { RectAreaLight } from "three";
import { getRectAreaLightConfig, RectAreaLightConfig } from "../LightConfig";
import { defineLightModel, LightModel } from "./LightModel";

export default defineLightModel<RectAreaLightConfig, RectAreaLight>(
  (lightModel) => ({
    type: "RectAreaLight",
    config: getRectAreaLightConfig,
    commands: {
      set: {
        rotation: undefined,
      },
    },

    create({ model, config, engine }) {
      const light = new RectAreaLight();

      light.rotation.set(
        config.rotation.x,
        config.rotation.y,
        config.rotation.z
      );

      light.updateMatrixWorld();

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
