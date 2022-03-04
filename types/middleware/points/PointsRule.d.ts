import { Points } from "three";
import { ObjectRule } from "../object/ObjectRule";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
export declare type PointsRule = ObjectRule<PointsCompiler, PointsConfig, PointsCompilerTarget, Points>;
export declare const PointsRule: PointsRule;
