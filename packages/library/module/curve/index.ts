import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { CurveCompiler } from "./CurveCompiler";
import { CurveRule } from "./CurveRule";
import ArcCurveProcessor from "./processors/ArcCurveProcessor";
import LineCurveProcessor from "./processors/LineCurveProcessor";

export * from "./extends";
export * from "./CurveCompiler";
export * from "./CurveConfig";

export default {
  type: "curve",
  compiler: CurveCompiler,
  rule: CurveRule,
  processors: [ArcCurveProcessor, LineCurveProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO - 1,
};
