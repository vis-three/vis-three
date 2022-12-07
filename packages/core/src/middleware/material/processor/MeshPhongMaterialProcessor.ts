import { MeshPhongMaterial } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import { MeshPhongMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<MeshPhongMaterialConfig, MeshPhongMaterial>({
  configType: CONFIGTYPE.MESHPHONGMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      specular: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: MeshPhongMaterialConfig,
    engine: EngineSupport
  ): MeshPhongMaterial {
    return create(new MeshPhongMaterial(), config, engine);
  },
  dispose,
});
