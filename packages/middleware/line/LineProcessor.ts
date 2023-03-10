import { Line } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { LineCompiler } from "./LineCompiler";
import { getLineConfig, LineConfig } from "./LineConfig";

export default defineProcessor<LineConfig, Line, EngineSupport, LineCompiler>({
  type: "Line",
  config: getLineConfig,
  commands: <SolidObjectCommands<LineConfig, Line>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: LineConfig, engine: EngineSupport): Line {
    return solidObjectCreate(new Line(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
