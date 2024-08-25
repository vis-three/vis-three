import { MeshBasicMaterial } from "three";
import {
  getMeshBasicMaterialConfig,
  MeshBasicMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<MeshBasicMaterialConfig, MeshBasicMaterial>(
  (materialModel) => ({
    type: "MeshBasicMaterial",
    config: getMeshBasicMaterialConfig,
    commands: {
      set: {
        color: getColorSetHandler(),
      },
    },
    create({ model, config, engine }) {
      return materialModel.create!({
        model: model as unknown as MaterialModel,
        target: new MeshBasicMaterial(),
        config,
        engine,
      });
    },
    dispose({ target }) {
      materialModel.dispose!({ target });
    },
  })
);
