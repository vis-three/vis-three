import { EngineSupport, defineProcessor } from "@vis-three/middleware";
import { MeshMatcapMaterial } from "three";
import {
  MeshMatcapMaterialConfig,
  getMeshMatcapMaterialConfig,
} from "../MaterialConfig";
import { MaterialCompiler } from "../MaterialCompiler";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
  mapHandler,
} from "./common";

export default defineProcessor<
  MeshMatcapMaterialConfig,
  MeshMatcapMaterial,
  EngineSupport,
  MaterialCompiler
>({
  type: "MeshMatcapMaterial",
  config: getMeshMatcapMaterialConfig,
  commands: {
    set: {
      color: colorSetHandler,
      matcap: mapHandler,
      $reg: [commonMapRegCommand, commonNeedUpdatesRegCommand],
    },
  },
  create(config, engine) {
    return create(new MeshMatcapMaterial(), config, engine);
  },
  dispose,
});
