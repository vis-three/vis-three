import { Color, HemisphereLight } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { HemisphereLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";
import { defineProcessor, ProcessParams } from "../../module";
import { EngineSupport } from "../../engine";

export default defineProcessor<
  HemisphereLightConfig,
  HemisphereLight,
  EngineSupport
>({
  configType: CONFIGTYPE.HEMISPHERELIGHT,
  commands: {
    set: {
      ...(lightCommands.set as unknown as ObjectCommands<
        HemisphereLightConfig,
        HemisphereLight
      >),
      groundColor: function ({
        target,
        value,
      }: ProcessParams<HemisphereLightConfig, HemisphereLight, EngineSupport>) {
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
