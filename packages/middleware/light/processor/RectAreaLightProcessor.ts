import { RectAreaLight } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { RectAreaLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";

export default defineProcessor<
  RectAreaLightConfig,
  RectAreaLight,
  EngineSupport
>({
  configType: CONFIGTYPE.RECTAREALIGHT,
  commands: lightCommands as unknown as ObjectCommands<
    RectAreaLightConfig,
    RectAreaLight
  >,
  create(config: RectAreaLightConfig, engine: EngineSupport): RectAreaLight {
    return lightCreate(new RectAreaLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
