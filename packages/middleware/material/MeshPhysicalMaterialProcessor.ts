import { MeshPhysicalMaterial } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  getMeshPhysicalMaterialConfig,
  MeshPhysicalMaterialConfig,
} from "./MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";
import { MaterialCompiler } from "./MaterialCompiler";

export default defineProcessor<
  MeshPhysicalMaterialConfig,
  MeshPhysicalMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "MeshPhysicalMaterial",
  config: getMeshPhysicalMaterialConfig,
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
