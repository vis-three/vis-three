import { ProxyNotice, Rule } from "../module";
import { GeometryCompiler } from "./GeometryCompiler";

export const GeometryRule: Rule<GeometryCompiler> = function (
  notice: ProxyNotice,
  compiler: GeometryCompiler
) {
  Rule(notice, compiler);
};
