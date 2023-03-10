import { LineBasicMaterial } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  getLineBasicMaterialConfig,
  LineBasicMaterialConfig,
} from "./MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";
import { MaterialCompiler } from "./MaterialCompiler";

export default defineProcessor<
  LineBasicMaterialConfig,
  LineBasicMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "LineBasicMaterial",
  config: getLineBasicMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: LineBasicMaterialConfig,
    engine: EngineSupport
  ): LineBasicMaterial {
    return create(new LineBasicMaterial(), config, engine);
  },
  dispose,
});
