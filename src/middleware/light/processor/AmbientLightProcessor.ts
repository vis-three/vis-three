import { AmbientLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { AmbientLightConfig } from "../LightConfig";
import { colorHandler, lightCommands, lightCreate } from "./common";

export default defineProcessor<AmbientLightConfig, AmbientLight>({
  configType: CONFIGTYPE.AMBIENTLIGHT,
  commands: lightCommands as unknown as ObjectCommands<
    AmbientLightConfig,
    AmbientLight
  >,
  create(config: AmbientLightConfig, engine: EngineSupport): AmbientLight {
    return lightCreate(new AmbientLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
