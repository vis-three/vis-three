import { ProxyNotice, Rule } from "@vis-three/middleware";
import { HelperCompiler } from "./HelperCompiler";
import { validate } from "uuid";

export const HelperRule: Rule<HelperCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
