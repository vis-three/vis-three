import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ConstraintorCompiler } from "./ConstraintorCompiler";
import { validate } from "uuid";

export const ConstraintorRule: Rule<ConstraintorCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
