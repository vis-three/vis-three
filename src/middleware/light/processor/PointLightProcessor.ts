import { PointLight } from "three";
import { defineProcessor } from "../../../core/Processor";
import { EngineSupport } from "../../../engine/EngineSupport";
import { CONFIGTYPE } from "../../constants/configType";
import { ObjectCommands, objectDispose } from "../../object/ObjectProcessor";
import { PointLightConfig } from "../LightConfig";
import { lightCommands, lightCreate } from "./common";

export default defineProcessor<PointLightConfig, PointLight>({
  configType: CONFIGTYPE.POINTLIGHT,
  commands: lightCommands as unknown as ObjectCommands<
    PointLightConfig,
    PointLight
  >,
  create(config: PointLightConfig, engine: EngineSupport): PointLight {
    return lightCreate(new PointLight(), config, {}, engine);
  },

  dispose: objectDispose,
});
