import { defineProcessor, EngineSupport } from "@vis-three/core";
import { Points } from "three";
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
