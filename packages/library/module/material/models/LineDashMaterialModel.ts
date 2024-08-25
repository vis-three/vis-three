import { LineDashedMaterial } from "three";
import {
  getLineDashedMaterialConfig,
  LineDashedMaterialConfig,
} from "../MaterialConfig";
import {
  defineMaterialModel,
  getColorSetHandler,
  MaterialModel,
} from "./MaterialModel";

export default defineMaterialModel<
  LineDashedMaterialConfig,
  LineDashedMaterial
>((materialModel) => ({
  type: "LineDashedMaterial",
  config: getLineDashedMaterialConfig,
  commands: {
    set: {
      color: getColorSetHandler(),
    },
  },
  create({ model, config, engine }) {
    return materialModel.create!({
      model: model as unknown as MaterialModel,
      target: new LineDashedMaterial(),
      config,
      engine,
    });
  },
  dispose({ target }) {
    materialModel.dispose!({ target });
  },
}));
