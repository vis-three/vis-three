import { DirectionalLight } from "three";
import {
  DirectionalLightConfig,
  getDirectionalLightConfig,
} from "../LightConfig";
import {
  LightCommands,
  ShadowCommands,
  WebGLRendererEngineSupport,
  lightCommands,
  shadowLightCreate,
} from "./common";
import { LightCompiler } from "../LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { objectDispose } from "@vis-three/module-object";

export default defineProcessor<
  DirectionalLightConfig,
  DirectionalLight,
  WebGLRendererEngineSupport,
  LightCompiler
>({
  type: "DirectionalLight",
  config: getDirectionalLightConfig,
  commands: {
    set: {
      ...(
        lightCommands as LightCommands<DirectionalLightConfig, DirectionalLight>
      ).set,
      ...(
        ShadowCommands as LightCommands<
          DirectionalLightConfig,
          DirectionalLight
        >
      ).set,
    },
  },
  create(config: DirectionalLightConfig, engine): DirectionalLight {
    return shadowLightCreate(new DirectionalLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
