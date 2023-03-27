import { PointsMaterial } from "three";
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
import { defineProcessor, EngineSupport } from "@vis-three/middleware";

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
