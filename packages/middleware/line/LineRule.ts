import { Line } from "three";
import { ProxyNotice, Rule } from "@vis-three/core";
import { ObjectRule } from "../object/ObjectRule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";

export type LineRule = SolidObjectRule<LineCompiler, LineConfig, Line>;

export const LineRule: Rule<LineCompiler> = function (
  notice: ProxyNotice,
  compiler: LineCompiler
) {
  ObjectRule(notice, compiler);
};
