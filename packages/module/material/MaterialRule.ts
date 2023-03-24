import { ProxyNotice, Rule } from "@vis-three/middleware";
import { MaterialCompiler } from "./MaterialCompiler";

export const MaterialRule: Rule<MaterialCompiler> = function (
  notice: ProxyNotice,
  compiler: MaterialCompiler
) {
  Rule(notice, compiler);
};
