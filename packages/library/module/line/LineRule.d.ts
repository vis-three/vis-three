import { Rule } from "@vis-three/middleware";
import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Line } from "three";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
export type LineRule = SolidObjectRule<LineCompiler, LineConfig, Line>;
export declare const LineRule: Rule<LineCompiler>;
