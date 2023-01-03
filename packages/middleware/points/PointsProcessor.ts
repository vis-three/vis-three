import { Points } from "three";
import { CONFIGTYPE } from "../constants/CONFIGTYPE";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { PointsConfig } from "./PointsConfig";

export default defineProcessor<PointsConfig, Points, EngineSupport>({
  configType: CONFIGTYPE.POINTS,
  commands: <SolidObjectCommands<PointsConfig, Points>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: PointsConfig, engine: EngineSupport): Points {
    return solidObjectCreate(new Points(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
