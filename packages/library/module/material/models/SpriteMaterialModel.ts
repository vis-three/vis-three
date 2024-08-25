import { SpriteMaterial } from "three";
import {
  getSpriteMaterialConfig,
  SpriteMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<SpriteMaterialConfig, SpriteMaterial>(
  (materialModel) => ({
    type: "SpriteMaterial",
    config: getSpriteMaterialConfig,
    commands: {
      set: {
        color: getColorSetHandler(),
      },
    },
    create({ model, config, engine }) {
      return materialModel.create!({
        model: model as unknown as MaterialModel,
        target: new SpriteMaterial(),
        config,
        engine,
      });
    },
    dispose({ target }) {
      materialModel.dispose!({ target });
    },
  })
);
