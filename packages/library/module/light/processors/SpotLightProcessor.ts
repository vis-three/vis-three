import { SpotLight } from "three";
import { getSpotLightConfig, SpotLightConfig } from "../LightConfig";
import {
  LightCommands,
  lightCommands,
  ShadowCommands,
  shadowLightCreate,
  WebGLRendererEngineSupport,
} from "./common";
import { LightCompiler } from "../LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

export default defineProcessor<
  SpotLightConfig,
  SpotLight,
  WebGLRendererEngineSupport,
  LightCompiler
>({
  type: "SpotLight",
  config: getSpotLightConfig,
  commands: {
    set: {
      ...(lightCommands as LightCommands<SpotLightConfig, SpotLight>).set,
      ...(ShadowCommands as LightCommands<SpotLightConfig, SpotLight>).set,
    },
  },
  create(config: SpotLightConfig, engine): SpotLight {
    return shadowLightCreate(new SpotLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
