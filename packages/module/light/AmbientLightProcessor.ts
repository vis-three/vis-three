import { AmbientLight } from "three";
import { AmbientLightConfig, getAmbientLightConfig } from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

export default defineProcessor<
  AmbientLightConfig,
  AmbientLight,
  EngineSupport,
  LightCompiler
>({
  type: "AmbientLight",
  config: getAmbientLightConfig,
  commands: lightCommands as LightCommands<AmbientLightConfig, AmbientLight>,
  create(config: AmbientLightConfig, engine: EngineSupport): AmbientLight {
    return lightCreate(new AmbientLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
