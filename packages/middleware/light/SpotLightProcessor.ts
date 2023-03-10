import { SpotLight } from "three";
import { EngineSupport } from "./../engine";
import { defineProcessor } from "./../module";
import { ObjectCommands, objectDispose } from "./../object/ObjectProcessor";
import { getSpotLightConfig, SpotLightConfig } from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";

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
