import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationActionCompiler } from "./AnimationActionCompiler";
import { AnimationActionRule } from "./AnimationActionRule";
import AnimationActionProcessor from "./processors/AnimationActionProcessor";

export * from "./AnimationActionConfig";
export * from "./AnimationActionCompiler";

export default {
  type: "animation-action",
  object: true,
  compiler: AnimationActionCompiler,
  rule: AnimationActionRule,
  processors: [AnimationActionProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE + 1,
};
