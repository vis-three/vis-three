import { MeshPhysicalMaterial } from "three";
import {
  getMeshPhysicalMaterialConfig,
  MeshPhysicalMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<
  MeshPhysicalMaterialConfig,
  MeshPhysicalMaterial
>((materialModel) => ({
  type: "MeshPhysicalMaterial",
  config: getMeshPhysicalMaterialConfig,
  commands: {
    set: {
      color: getColorSetHandler(),
      emissive: getColorSetHandler(),
      specularColor: getColorSetHandler(),
      sheenColor: getColorSetHandler(),
      attenuationColor: getColorSetHandler(),
    },
  },
  create({ model, config, engine }) {
    return materialModel.create!({
      model: model as unknown as MaterialModel,
      target: new MeshPhysicalMaterial(),
      config,
      engine,
    });
  },
  dispose({ target }) {
    materialModel.dispose!({ target });
  },
}));
