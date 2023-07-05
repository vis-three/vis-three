import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { ConstraintorCompiler } from "./ConstraintorCompiler";
import { ConstraintorRule } from "./ConstraintorRule";
import ConstraintorProcessor from "./processors/ConstraintorProcessor";

export default {
  type: "constraintor",
  object: true,
  compiler: ConstraintorCompiler,
  rule: ConstraintorRule,
  processors: [ConstraintorProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};