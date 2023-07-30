import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ReflectorCompiler } from "./ReflectorCompiler";
import { validate } from "uuid";

export const ReflectorRule: Rule<ReflectorCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
