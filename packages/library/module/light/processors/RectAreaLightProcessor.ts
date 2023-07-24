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
  commands: {
    set: {
      ...(lightCommands as LightCommands<RectAreaLightConfig, RectAreaLight>)
        .set,
      rotation: undefined,
    },
  },
  create(config: RectAreaLightConfig, engine: EngineSupport): RectAreaLight {
    const light = lightCreate(new RectAreaLight(), config, {}, engine);
    light.rotation.set(config.rotation.x, config.rotation.y, config.rotation.z);
    light.updateMatrixWorld();
    return light;
  },

  dispose: objectDispose,
});
