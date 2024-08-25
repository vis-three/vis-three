import { PointsMaterial } from "three";
import {
  getPointsMaterialConfig,
  PointsMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<PointsMaterialConfig, PointsMaterial>(
  (materialModel) => ({
    type: "PointsMaterial",
    config: getPointsMaterialConfig,
    commands: {
      set: {
        color: getColorSetHandler(),
      },
    },
    create({ model, config, engine }) {
      return materialModel.create!({
        model: model as unknown as MaterialModel,
        target: new PointsMaterial(),
        config,
        engine,
      });
    },
    dispose({ target }) {
      materialModel.dispose!({ target });
    },
  })
);
