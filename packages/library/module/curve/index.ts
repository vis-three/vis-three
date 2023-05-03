import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { CurveCompiler } from "./CurveCompiler";
import { CurveRule } from "./CurveRule";
import CurveProcessor from "./processors/ArcCurveProcessor";

export default {
  type: "curve",
  object: true,
  compiler: CurveCompiler,
  rule: CurveRule,
  processors: [CurveProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO - 1,
};
