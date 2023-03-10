import { PointsMaterial } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  getPointsMaterialConfig,
  PointsMaterialConfig,
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
  PointsMaterialConfig,
  PointsMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "PointsMaterial",
  config: getPointsMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: PointsMaterialConfig,
    engine: EngineSupport
  ): PointsMaterial {
    return create(new PointsMaterial(), config, engine);
  },
  dispose,
});
