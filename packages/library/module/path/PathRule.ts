import { ProxyNotice, Rule } from "@vis-three/middleware";
import { PathCompiler } from "./PathCompiler";
import { validate } from "uuid";

export const PathRule: Rule<PathCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
