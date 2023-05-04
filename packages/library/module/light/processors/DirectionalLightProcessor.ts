import { DirectionalLight } from "three";
import {
  DirectionalLightConfig,
  getDirectionalLightConfig,
} from "../LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "../LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

export default defineProcessor<
  DirectionalLightConfig,
  DirectionalLight,
  EngineSupport,
  LightCompiler
>({
  type: "DirectionalLight",
  config: getDirectionalLightConfig,
  commands: lightCommands as LightCommands<
    DirectionalLightConfig,
    DirectionalLight
  >,
  create(
    config: DirectionalLightConfig,
    engine: EngineSupport
  ): DirectionalLight {
    return lightCreate(new DirectionalLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
