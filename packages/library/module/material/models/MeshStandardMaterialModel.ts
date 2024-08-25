import { MeshPhysicalMaterial, MeshStandardMaterial } from "three";
import {
  getMeshStandardMaterialConfig,
  MeshStandardMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<
  MeshStandardMaterialConfig,
  MeshStandardMaterial
>((materialModel) => ({
  type: "MeshStandardMaterial",
  config: getMeshStandardMaterialConfig,
  commands: {
    set: {
      color: getColorSetHandler(),
      emissive: getColorSetHandler(),
    },
  },
  create({ model, config, engine }) {
    return materialModel.create!({
      model: model as unknown as MaterialModel,
      target: new MeshStandardMaterial(),
      config,
      engine,
    });
  },
  dispose({ target }) {
    materialModel.dispose!({ target });
  },
}));
