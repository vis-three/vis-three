import { SpotLight } from "three";

import { antiShake, defineProcessor, EngineSupport } from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
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
