import { ProxyNotice, Rule } from "@vis-three/middleware";
import { SkeletonCompiler } from "./SkeletonCompiler";
import { validate } from "uuid";

export const SkeletonRule: Rule<SkeletonCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
