import { RectAreaLight } from "three";
import { EngineSupport } from "./../engine";
import { defineProcessor } from "./../module";
import { objectDispose } from "./../object/ObjectProcessor";
import { getRectAreaLightConfig, RectAreaLightConfig } from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";

export default defineProcessor<
  RectAreaLightConfig,
  RectAreaLight,
  EngineSupport,
  LightCompiler
>({
  type: "RectAreaLight",
  config: getRectAreaLightConfig,
  commands: lightCommands as LightCommands<RectAreaLightConfig, RectAreaLight>,
  create(config: RectAreaLightConfig, engine: EngineSupport): RectAreaLight {
    return lightCreate(new RectAreaLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
