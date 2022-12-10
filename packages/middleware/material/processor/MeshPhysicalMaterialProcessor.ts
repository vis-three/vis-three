import { MeshPhysicalMaterial } from "three";

import { antiShake, EngineSupport, defineProcessor } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { MeshPhysicalMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<
  MeshPhysicalMaterialConfig,
  MeshPhysicalMaterial
>({
  configType: CONFIGTYPE.MESHPHYSICALMATERIAL,
  commands: {
    set: {
      color: colorSetHandler,
      emissive: colorSetHandler,
      specularColor: colorSetHandler,
      sheenColor: colorSetHandler,
      attenuationColor: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: MeshPhysicalMaterialConfig,
    engine: EngineSupport
  ): MeshPhysicalMaterial {
    return create(new MeshPhysicalMaterial(), config, engine);
  },
  dispose,
});
