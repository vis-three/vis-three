import { ProxyNotice, Rule } from "@vis-three/middleware";
import { ObjectRule } from "@vis-three/module-object";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Line } from "three";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";

export type LineRule = SolidObjectRule<LineCompiler, LineConfig, Line>;

export const LineRule: Rule<LineCompiler> = function (
  notice: ProxyNotice,
  compiler: LineCompiler
) {
  ObjectRule(notice, compiler);
};
