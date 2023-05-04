import { LineBasicMaterial } from "three";
import {
  getLineBasicMaterialConfig,
  LineBasicMaterialConfig,
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
