import { defineModule } from "../module";
import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationRule } from "./AnimationRule";
import ScriptAnimationProcessor from "./ScriptAnimationProcessor";

export default defineModule({
  type: "animation",
  compiler: AnimationCompiler,
  rule: AnimationRule,
  processors: [ScriptAnimationProcessor],
});
