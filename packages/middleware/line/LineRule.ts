import { Line } from "three";
import { ProxyNotice } from "../../core/DataContainer";
import { Rule } from "../../core/Rule";
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
