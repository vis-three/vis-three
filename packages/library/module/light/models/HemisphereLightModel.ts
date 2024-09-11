import { Color, HemisphereLight } from "three";
import {
  getHemisphereLightConfig,
  HemisphereLightConfig,
} from "../LightConfig";
import { defineLightModel, LightModel } from "./LightModel";

export default defineLightModel<
  HemisphereLightConfig,
  HemisphereLight,
  {},
  {
    cacheColor: Color;
  }
>((lightModel) => ({
  type: "HemisphereLight",
  config: getHemisphereLightConfig,
  shared: {
    cacheColor: new Color(),
  },
  commands: {
    set: {
      groundColor({ model, target, value }) {
        target.groundColor.copy(model.cacheColor.set(value));
      },
    },
  },
  create({ model, config, engine }) {
    const light = new HemisphereLight();
    light.groundColor.copy(model.cacheColor.set(config.groundColor));
    lightModel.create!({
      model: model as unknown as LightModel,
      light,
      config,
      filter: { groundColor: true },
      engine,
      shadow: false,
    });

    return light;
  },

  dispose({ target }) {
    lightModel.dispose!(target);
  },
}));
