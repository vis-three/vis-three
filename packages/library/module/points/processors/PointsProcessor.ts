import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import {
  solidObjectCommands,
  SolidObjectCommands,
  solidObjectCreate,
  solidObjectDispose,
} from "@vis-three/module-solid-object";
import { Points } from "three";
import { PointsCompiler } from "../PointsCompiler";
import { getPointsConfig, PointsConfig } from "../PointsConfig";

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
