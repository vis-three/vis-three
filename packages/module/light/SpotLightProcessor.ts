import { SpotLight } from "three";
import { getSpotLightConfig, SpotLightConfig } from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

export default defineProcessor<
  SpotLightConfig,
  SpotLight,
  EngineSupport,
  LightCompiler
>({
  type: "SpotLight",
  config: getSpotLightConfig,
  commands: lightCommands as LightCommands<SpotLightConfig, SpotLight>,
  create(config: SpotLightConfig, engine: EngineSupport): SpotLight {
    return lightCreate(new SpotLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
