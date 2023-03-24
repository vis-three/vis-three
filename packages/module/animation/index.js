import { AnimationCompiler } from "./AnimationCompiler";
import { AnimationRule } from "./AnimationRule";
import ScriptAnimationProcessor from "./ScriptAnimationProcessor";
export default {
    type: "animation",
    compiler: AnimationCompiler,
    rule: AnimationRule,
    processors: [ScriptAnimationProcessor],
};
