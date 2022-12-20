import { SpotLight } from "three";
import { CONFIGTYPE } from "../../constants/configType";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { SpotLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";

export default defineProcessor<SpotLightConfig, SpotLight>({
  configType: CONFIGTYPE.SPOTLIGHT,
  commands: lightCommands as unknown as ObjectCommands<
    SpotLightConfig,
    SpotLight
  >,
  create(config: SpotLightConfig, engine: EngineSupport): SpotLight {
    return lightCreate(new SpotLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
