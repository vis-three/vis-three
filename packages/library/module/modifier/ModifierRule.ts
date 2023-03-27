import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ModifierCompiler } from "./ModifierCompiler";

export const ModifierRule: Rule<ModifierCompiler> = function (
  notice: ProxyNotice,
  compiler: ModifierCompiler
) {
  Rule(notice, compiler);
};
