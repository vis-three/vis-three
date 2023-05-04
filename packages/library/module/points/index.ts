import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { PointsCompiler } from "./PointsCompiler";
import PointsProcessor from "./processors/PointsProcessor";
import { PointsRule } from "./PointsRule";

export * from "./PointsConfig";
export * from "./PointsCompiler";

export default {
  type: "points",
  object: true,
  compiler: PointsCompiler,
  rule: PointsRule,
  processors: [PointsProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.THREE,
};
