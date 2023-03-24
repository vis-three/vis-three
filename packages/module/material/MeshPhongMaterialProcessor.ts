import { MeshPhongMaterial } from "three";
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
import { defineProcessor, EngineSupport } from "@vis-three/middleware";

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
