import { SUPPORT_LIFE_CYCLE } from "@vis-three/middleware";
import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationRule } from "./AnimationRule";
import ScriptAnimationProcessor from "./ScriptAnimationProcessor";

export default {
  type: "animation",
  compiler: AnimationCompiler,
  rule: AnimationRule,
  processors: [ScriptAnimationProcessor],
  lifeOrder: SUPPORT_LIFE_CYCLE.NINE,
};
