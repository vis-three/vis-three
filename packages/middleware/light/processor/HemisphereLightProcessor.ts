import { Color, HemisphereLight } from "three";
import {
  antiShake,
  EngineSupport,
  defineProcessor,
  ProcessParams,
} from "@vis-three/core";
import { CONFIGTYPE } from "../../constants/configType";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { HemisphereLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";

export default defineProcessor<HemisphereLightConfig, HemisphereLight>({
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
