import { AmbientLight } from "three";
import { EngineSupport } from "../engine";
import { Compiler, defineProcessor } from "../module";
import { ObjectCommands, objectDispose } from "../object/ObjectProcessor";
import { AmbientLightConfig, getAmbientLightConfig } from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";

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
