import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { MaterialCompiler } from "./MaterialCompiler";

export const MaterialRule: Rule<MaterialCompiler> = function (
  notice: ProxyNotice,
  compiler: MaterialCompiler
) {
  Rule(notice, compiler);
};
