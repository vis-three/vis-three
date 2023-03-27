import { SpriteMaterial } from "three";
import {
  getSpriteMaterialConfig,
  SpriteMaterialConfig,
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
  SpriteMaterialConfig,
  SpriteMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "SpriteMaterial",
  config: getSpriteMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: SpriteMaterialConfig,
    engine: EngineSupport
  ): SpriteMaterial {
    return create(new SpriteMaterial(), config, engine);
  },
  dispose,
});
