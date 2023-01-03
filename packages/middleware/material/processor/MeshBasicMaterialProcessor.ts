import { MeshBasicMaterial } from "three";

import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { MeshBasicMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<
  MeshBasicMaterialConfig,
  MeshBasicMaterial,
  EngineSupport
>({
  configType: CONFIGTYPE.MESHBASICMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: MeshBasicMaterialConfig,
    engine: EngineSupport
  ): MeshBasicMaterial {
    return create(new MeshBasicMaterial(), config, engine);
  },
  dispose,
});
