import { MeshBasicMaterial } from "three";

import {
  getMeshBasicMaterialConfig,
  MeshBasicMaterialConfig,
} from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";
import { MaterialCompiler } from "../MaterialCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";

export default defineProcessor<
  MeshBasicMaterialConfig,
  MeshBasicMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "MeshBasicMaterial",
  config: getMeshBasicMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create: function (
    config: MeshBasicMaterialConfig,
    engine: EngineSupport
  ): MeshBasicMaterial {
    return create(new MeshBasicMaterial(), config, engine);
  },
  dispose,
});
