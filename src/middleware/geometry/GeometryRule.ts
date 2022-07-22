import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { GeometryCompiler } from "./GeometryCompiler";

export const GeometryRule: Rule<GeometryCompiler> = function (
  notice: ProxyNotice,
  compiler: GeometryCompiler
) {
  Rule(notice, compiler);
};
