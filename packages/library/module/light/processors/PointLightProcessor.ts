import { PointLight } from "three";
import { getPointLightConfig, PointLightConfig } from "../LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "../LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

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
