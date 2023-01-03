import { AmbientLight } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { AmbientLightConfig } from "../LightConfig";
import { colorHandler, lightCommands, lightCreate } from "./common";

export default defineProcessor<AmbientLightConfig, AmbientLight, EngineSupport>(
  {
    configType: CONFIGTYPE.AMBIENTLIGHT,
    commands: lightCommands as unknown as ObjectCommands<
      AmbientLightConfig,
      AmbientLight
    >,
    create(config: AmbientLightConfig, engine: EngineSupport): AmbientLight {
      return lightCreate(new AmbientLight(), config, {}, engine);
    },

    dispose: objectDispose,
  }
);
