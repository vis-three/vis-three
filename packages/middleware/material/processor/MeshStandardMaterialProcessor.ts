import { MeshStandardMaterial } from "three";
import { CONFIGTYPE } from "../../constants/configType";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { MeshStandardMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<
  MeshStandardMaterialConfig,
  MeshStandardMaterial,
  EngineSupport
>({
  configType: CONFIGTYPE.MESHSTANDARDMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: MeshStandardMaterialConfig,
    engine: EngineSupport
  ): MeshStandardMaterial {
    return create(new MeshStandardMaterial(), config, engine);
  },
  dispose,
});
