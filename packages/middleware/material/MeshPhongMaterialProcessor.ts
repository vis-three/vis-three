import { MeshPhongMaterial } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  getMeshPhongMaterialConfig,
  MeshPhongMaterialConfig,
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
  MeshPhongMaterialConfig,
  MeshPhongMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "MeshPhongMaterial",
  config: getMeshPhongMaterialConfig,
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
