import { Line } from "three";
import { defineProcessor } from "../../core/Processor";
import { EngineSupport } from "../../engine/EngineSupport";
import { CONFIGTYPE } from "../constants/configType";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { LineConfig } from "./LineConfig";

export default defineProcessor<LineConfig, Line>({
  configType: CONFIGTYPE.LINE,
  commands: <SolidObjectCommands<LineConfig, Line>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: LineConfig, engine: EngineSupport): Line {
    return solidObjectCreate(new Line(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
