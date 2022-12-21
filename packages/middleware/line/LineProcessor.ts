import { Line } from "three";
import { CONFIGTYPE } from "../constants/configType";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { LineConfig } from "./LineConfig";

export default defineProcessor<LineConfig, Line, EngineSupport>({
  configType: CONFIGTYPE.LINE,
  commands: <SolidObjectCommands<LineConfig, Line>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: LineConfig, engine: EngineSupport): Line {
    return solidObjectCreate(new Line(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
