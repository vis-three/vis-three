import { DirectionalLight } from "three";
import { EngineSupport } from "./../engine";
import { defineProcessor } from "./../module";
import { ObjectCommands, objectDispose } from "./../object/ObjectProcessor";
import {
  DirectionalLightConfig,
  getDirectionalLightConfig,
} from "./LightConfig";
import { LightCommands, lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";

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
