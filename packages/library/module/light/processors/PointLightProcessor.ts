import { PointLight } from "three";
import { getPointLightConfig, PointLightConfig } from "../LightConfig";
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
  PointLightConfig,
  PointLight,
  WebGLRendererEngineSupport,
  LightCompiler
>({
  type: "PointLight",
  config: getPointLightConfig,
  commands: {
    set: {
      ...(lightCommands as LightCommands<PointLightConfig, PointLight>).set,
      ...(ShadowCommands as LightCommands<PointLightConfig, PointLight>).set,
    },
  },
  create(config: PointLightConfig, engine): PointLight {
    return shadowLightCreate(new PointLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
