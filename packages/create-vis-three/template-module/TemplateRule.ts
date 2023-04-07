import { ProxyNotice, Rule } from "@vis-three/middleware";
import { TemplateCompiler } from "./TemplateCompiler";
import { validate } from "uuid";

export const TemplateRule: Rule<TemplateCompiler> = function (
  input: ProxyNotice,
  compiler,
  validateFun = validate
) {
  Rule(input, compiler, validateFun);
};
