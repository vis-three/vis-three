import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationClipCompiler } from "./AnimationClipCompiler";
import { AnimationClipRule } from "./AnimationClipRule";
import AnimationClipProcessor from "./processors/AnimationClipProcessor";
import LoadAnimationClipProcessor from "./processors/LoadAnimationClipProcessor";

export * from "./AnimationClipConfig";
export * from "./AnimationClipCompiler";

export default {
  type: "animation-clip",
  compiler: AnimationClipCompiler,
  rule: AnimationClipRule,
  processors: [AnimationClipProcessor, LoadAnimationClipProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.ZERO,
};
