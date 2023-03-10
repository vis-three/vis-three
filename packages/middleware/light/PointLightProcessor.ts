import { PointLight } from "three";
import { EngineSupport } from "./../engine";
import { defineProcessor } from "./../module";
import { objectDispose } from "./../object/ObjectProcessor";
import { getPointLightConfig, PointLightConfig } from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";

export default defineProcessor<
  PointLightConfig,
  PointLight,
  EngineSupport,
  LightCompiler
>({
  type: "PointLight",
  config: getPointLightConfig,
  commands: lightCommands as LightCommands<PointLightConfig, PointLight>,
  create(config: PointLightConfig, engine: EngineSupport): PointLight {
    return lightCreate(new PointLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
