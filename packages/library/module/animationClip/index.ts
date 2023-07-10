import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationClipCompiler } from "./AnimationClipCompiler";
import { AnimationClipRule } from "./AnimationClipRule";
import AnimationClipProcessor from "./processors/AnimationClipProcessor";

export default {
  type: "animation-clip",
  object: true,
  compiler: AnimationClipCompiler,
  rule: AnimationClipRule,
  processors: [AnimationClipProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};
