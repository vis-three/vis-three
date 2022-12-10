import { LineBasicMaterial } from "three";

import { antiShake, defineProcessor, EngineSupport } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { LineBasicMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<LineBasicMaterialConfig, LineBasicMaterial>({
  configType: CONFIGTYPE.LINEBASICMATERIAL,
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
