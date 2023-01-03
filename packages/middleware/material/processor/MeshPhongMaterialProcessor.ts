import { MeshPhongMaterial } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { MeshPhongMaterialConfig } from "../MaterialConfig";
import {
  colorSetHandler,
  commonMapRegCommand,
  commonNeedUpdatesRegCommand,
  create,
  dispose,
} from "./common";

export default defineProcessor<
  MeshPhongMaterialConfig,
  MeshPhongMaterial,
  EngineSupport
>({
  configType: CONFIGTYPE.MESHPHONGMATERIAL,
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
