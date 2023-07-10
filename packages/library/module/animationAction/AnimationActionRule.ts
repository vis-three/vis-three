import { ProxyNotice, Rule } from "@vis-three/middleware";
import { AnimationActionCompiler } from "./AnimationActionCompiler";
import { validate } from "uuid";

export const AnimationActionRule: Rule<AnimationActionCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
