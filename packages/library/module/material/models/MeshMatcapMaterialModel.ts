import { MeshMatcapMaterial } from "three";
import {
  getMeshMatcapMaterialConfig,
  MeshMatcapMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  getMapHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<
  MeshMatcapMaterialConfig,
  MeshMatcapMaterial
>((materialModel) => ({
  type: "MeshMatcapMaterial",
  config: getMeshMatcapMaterialConfig,
  commands: {
    set: {
      color: getColorSetHandler(),
      matcap: getMapHandler(),
    },
  },
  create({ model, config, engine }) {
    return materialModel.create!({
      model: model as unknown as MaterialModel,
      target: new MeshMatcapMaterial(),
      config,
      engine,
    });
  },
  dispose({ target }) {
    materialModel.dispose!({ target });
  },
}));
