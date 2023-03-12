import { ProxyNotice, Rule } from "@vis-three/middleware";
import { PassCompiler } from "./PassCompiler";

export const PassRule: Rule<PassCompiler> = function (
  input: ProxyNotice,
  compiler: PassCompiler
) {
  Rule(input, compiler);
};
