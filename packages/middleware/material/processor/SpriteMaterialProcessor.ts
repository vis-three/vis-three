import { SpriteMaterial } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { SpriteMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<
  SpriteMaterialConfig,
  SpriteMaterial,
  EngineSupport
>({
  configType: CONFIGTYPE.SPRITEMATERIAL,
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
