import { RectAreaLight } from "three";
import { getRectAreaLightConfig, RectAreaLightConfig } from "../LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "../LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

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
