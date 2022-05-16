import { Line } from "three";
import { Rule } from "../../core/Rule";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
export declare type LineRule = SolidObjectRule<LineCompiler, LineConfig, LineCompilerTarget, Line>;
export declare const LineRule: Rule<LineCompiler>;
