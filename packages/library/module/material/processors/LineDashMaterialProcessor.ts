import { LineBasicMaterial, LineDashedMaterial } from "three";
import {
  getLineDashedMaterialConfig,
  LineDashedMaterialConfig,
} from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";
import { MaterialCompiler } from "../MaterialCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";

export default defineProcessor<
  LineDashedMaterialConfig,
  LineDashedMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "LineDashedMaterial",
  config: getLineDashedMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (config, engine) {
    return create(new LineDashedMaterial(), config, engine);
  },
  dispose,
});
