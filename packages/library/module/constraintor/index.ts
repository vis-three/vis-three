import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ConstraintorCompiler } from "./ConstraintorCompiler";
import { ConstraintorRule } from "./ConstraintorRule";
import NumberConstraintorProcessor from "./processors/NumberConstraintorProcessor";
import BoundingBoxConstraintorProcessor from "./processors/BoundingBoxConstraintorProcessor";

export default {
  type: "constraintor",
  compiler: ConstraintorCompiler,
  rule: ConstraintorRule,
  processors: [NumberConstraintorProcessor, BoundingBoxConstraintorProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
};
