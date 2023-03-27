import { Color, HemisphereLight } from "three";
import { getHemisphereLightConfig, HemisphereLightConfig } from "./LightConfig";
import { lightCommands, lightCreate } from "./common";
import { LightCompiler } from "./LightCompiler";
import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { ObjectCommands, objectDispose } from "@vis-three/module-object";

export default defineProcessor<
  HemisphereLightConfig,
  HemisphereLight,
  EngineSupport,
  LightCompiler
>({
  type: "HemisphereLight",
  config: getHemisphereLightConfig,
  commands: {
    set: {
      ...(lightCommands.set as unknown as ObjectCommands<
        HemisphereLightConfig,
        HemisphereLight
      >),
      groundColor: function ({ target, value }) {
        target.groundColor.copy(new Color(value));
      },
    },
  },
  create(
    config: HemisphereLightConfig,
    engine: EngineSupport
  ): HemisphereLight {
    const light = new HemisphereLight();

    light.groundColor.copy(new Color(config.groundColor));

    return lightCreate(
      light,
      config,
      {
        groundColor: true,
      },
      engine
    );
  },

  dispose: objectDispose,
});
