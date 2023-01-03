import { MeshPhysicalMaterial } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
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
  MeshPhysicalMaterial,
  EngineSupport
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
