import { MeshStandardMaterial } from "three";
import {
  getMeshStandardMaterialConfig,
  MeshStandardMaterialConfig,
} from "./MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";
import { MaterialCompiler } from "./MaterialCompiler";
import { EngineSupport, defineProcessor } from "@vis-three/middleware";

export default defineProcessor<
  MeshStandardMaterialConfig,
  MeshStandardMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "MeshStandardMaterial",
  config: getMeshStandardMaterialConfig,
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
