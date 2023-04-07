import { ProxyNotice, Rule } from "@vis-three/middleware";
import { TemplateCompiler } from "./TemplateCompiler";
import { validate } from "uuid";
import { TemplateConfig } from "./TemplateConfig";

export const TemplateRule = function <
  E extends TemplateCompiler,
  C extends TemplateConfig,
  O extends object
>(input: ProxyNotice, compiler: E, validateFun = validate) {
  if (input.key === "parent") {
    return;
  }

  Rule(input, compiler, validateFun);
};
