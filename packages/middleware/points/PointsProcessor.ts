import { Points } from "three";
import { EngineSupport } from "../engine";
import { defineProcessor } from "../module";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "../solidObject/SolidObjectProcessor";
import { PointsCompiler } from "./PointsCompiler";
import { getPointsConfig, PointsConfig } from "./PointsConfig";

export default defineProcessor<
  PointsConfig,
  Points,
  EngineSupport,
  PointsCompiler
>({
  type: "Points",
  config: getPointsConfig,
  commands: <SolidObjectCommands<PointsConfig, Points>>(
    (<unknown>solidObjectCommands)
  ),
  create(config: PointsConfig, engine: EngineSupport): Points {
    return solidObjectCreate(new Points(), config, {}, engine);
  },
  dispose: solidObjectDispose,
});
