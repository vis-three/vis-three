import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ShapeCompiler } from "./ShapeCompiler";

export const ShapeRule: Rule<ShapeCompiler> = function (
  notice: ProxyNotice,
  compiler: ShapeCompiler
) {
  Rule(notice, compiler);
};
