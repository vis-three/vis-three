import { ProxyNotice, Rule } from "@vis-three/middleware";
import { CurveCompiler } from "./CurveCompiler";
import { validate } from "uuid";

export const CurveRule: Rule<CurveCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
