import { MaterialCompiler } from "./MaterialCompiler";
import { ProxyNotice, Rule } from "@vis-three/core";

export const MaterialRule: Rule<MaterialCompiler> = function (
  notice: ProxyNotice,
  compiler: MaterialCompiler
) {
  Rule(notice, compiler);
};
