import { MeshPhongMaterial } from "three";
import {
  getMeshPhongMaterialConfig,
  MeshPhongMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<MeshPhongMaterialConfig, MeshPhongMaterial>(
  (materialModel) => ({
    type: "MeshPhongMaterial",
    config: getMeshPhongMaterialConfig,
    commands: {
      set: {
        color: getColorSetHandler(),
        emissive: getColorSetHandler(),
        specular: getColorSetHandler(),
      },
    },
    create({ model, config, engine }) {
      return materialModel.create!({
        model: model as unknown as MaterialModel,
        target: new MeshPhongMaterial(),
        config,
        engine,
      });
    },
    dispose({ target }) {
      materialModel.dispose!({ target });
    },
  })
);
