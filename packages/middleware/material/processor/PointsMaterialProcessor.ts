import { PointsMaterial } from "three";

import { antiShake, defineProcessor, EngineSupport } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { PointsMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<PointsMaterialConfig, PointsMaterial>({
  configType: CONFIGTYPE.POINTSMATERIAL,
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
