import { ProxyNotice, Rule } from "@vis-three/middleware";
import { AnimationClipCompiler } from "./AnimationClipCompiler";
import { validate } from "uuid";

export const AnimationClipRule: Rule<AnimationClipCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
