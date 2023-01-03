import { DirectionalLight } from "three";
import { CONFIGTYPE } from "../../constants/CONFIGTYPE";
import { EngineSupport } from "../../engine";
import { defineProcessor } from "../../module";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { DirectionalLightConfig } from "../LightConfig";
import { colorHandler, lightCommands, lightCreate } from "./common";

export default defineProcessor<
  DirectionalLightConfig,
  DirectionalLight,
  EngineSupport
>({
  configType: CONFIGTYPE.DIRECTIONALLIGHT,
  commands: lightCommands as unknown as ObjectCommands<
    DirectionalLightConfig,
    DirectionalLight
  >,
  create(
    config: DirectionalLightConfig,
    engine: EngineSupport
  ): DirectionalLight {
    return lightCreate(new DirectionalLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
