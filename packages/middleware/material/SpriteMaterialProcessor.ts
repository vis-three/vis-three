import { SpriteMaterial } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
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
