import { MeshStandardMaterial } from "three";

import { antiShake, defineProcessor, EngineSupport } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
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
  MeshStandardMaterial
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
