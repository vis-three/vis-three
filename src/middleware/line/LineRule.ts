import { Line } from "three";
import { validate } from "uuid";
import { ProxyNotice } from "../../core/ProxyBroadcast";
import { Rule } from "../../core/Rule";
import { ObjectRule } from "../object/ObjectRule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
import { LineConfig } from "./LineConfig";

export type LineRule = SolidObjectRule<
  LineCompiler,
  LineConfig,
  LineCompilerTarget,
  Line
>;

export const LineRule: Rule<LineCompiler> = function (
  notice: ProxyNotice,
  compiler: LineCompiler
) {
  ObjectRule(notice, compiler);
};
