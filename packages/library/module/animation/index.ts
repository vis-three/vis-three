import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationRule } from "./AnimationRule";
import ScriptAnimationProcessor from "./processors/ScriptAnimationProcessor";
import MixerAnimationProcessor from "./processors/MixerAnimationProcessor";

export * from "./AnimationCompiler";
export * from "./AnimationConfig";

export default {
  type: "animation",
  compiler: AnimationCompiler,
  rule: AnimationRule,
  processors: [ScriptAnimationProcessor, MixerAnimationProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
};
