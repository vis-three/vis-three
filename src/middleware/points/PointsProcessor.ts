import { Points } from "three";
import { defineProcessor } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
import { CONFIGTYPE } from "../constants/configType";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { PointsConfig } from "./PointsConfig";

export default defineProcessor<PointsConfig, Points>({
  configType: CONFIGTYPE.POINTS,
  commands: <SolidObjectCommands<PointsConfig, Points>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: PointsConfig, engine: EngineSupport): Points {
    return solidObjectCreate(new Points(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
