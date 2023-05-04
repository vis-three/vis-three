import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { Line } from "three";
import { LineCompiler } from "../LineCompiler";
import { getLineConfig, LineConfig } from "../LineConfig";

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
