import { Line } from "three";
import { Rule } from "../../core/Rule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
export type LineRule = SolidObjectRule<LineCompiler, LineConfig, Line>;
export declare const LineRule: Rule<LineCompiler>;
