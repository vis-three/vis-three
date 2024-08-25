import { LineBasicMaterial } from "three";
import {
  getLineBasicMaterialConfig,
  LineBasicMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<LineBasicMaterialConfig, LineBasicMaterial>(
  (materialModel) => ({
    type: "LineBasicMaterial",
    config: getLineBasicMaterialConfig,
    commands: {
      set: {
        color: getColorSetHandler(),
      },
    },
    create({ model, config, engine }) {
      return materialModel.create!({
        model: model as unknown as MaterialModel,
        target: new LineBasicMaterial(),
        config,
        engine,
      });
    },
    dispose({ target }) {
      materialModel.dispose!({ target });
    },
  })
);
