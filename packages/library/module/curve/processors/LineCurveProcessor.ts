import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { CurveCompiler } from "../CurveCompiler";
import { getLineCurveConfig, LineCurveConfig } from "../CurveConfig";
import { commonRegCommand } from "./common";
import { LineCurve, Vector2 } from "three";

export default defineProcessor<
  LineCurveConfig,
  LineCurve,
  EngineSupport,
  CurveCompiler
>({
  type: "LineCurve",
  config: getLineCurveConfig,
  commands: {
    add: {},
    set: {
      $reg: [commonRegCommand],
    },
    delete: {},
  },
  create(config, engine) {
    return new LineCurve(
      new Vector2(config.startX, config.startY),
      new Vector2(config.endX, config.endY)
    );
  },
  dispose() {},
});
