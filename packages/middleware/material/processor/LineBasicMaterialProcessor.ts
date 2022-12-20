import { LineBasicMaterial } from "three";
import { CONFIGTYPE } from "../../constants/configType";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
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
