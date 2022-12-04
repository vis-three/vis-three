import { Color, HemisphereLight } from "three";
import { defineProcessor, ProcessParams } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import { objectDispose } from "../../object/ObjectProcessor";
import { HemisphereLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";

export default defineProcessor<HemisphereLightConfig, HemisphereLight>({
  configType: CONFIGTYPE.HEMISPHERELIGHT,
  commands: {
    set: {
      ...lightCommands.set,
      groundColor: function ({
        target,
        value,
      }: ProcessParams<HemisphereLightConfig, HemisphereLight>) {
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
