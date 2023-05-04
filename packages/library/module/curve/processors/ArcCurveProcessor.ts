import { defineProcessor, EngineSupport } from "@vis-three/middleware";
import { CurveCompiler } from "../CurveCompiler";
import { getArcCurveConfig, ArcCurveConfig } from "../CurveConfig";
import { ArcCurve } from "../extends/ArcCurve";

export default defineProcessor<
  ArcCurveConfig,
  ArcCurve,
  EngineSupport,
  CurveCompiler
>({
  type: "ArcCurve",
  config: getArcCurveConfig,
  commands: {
    add: {},
    set: {},
    delete: {},
  },
  create(config, engine) {
    return new ArcCurve(
      config.start.x,
      config.start.y,
      config.vertical,
      config.clockwise,
      config.end.x,
      config.end.y
    );
  },
  dispose() {},
});
