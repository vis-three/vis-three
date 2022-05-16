import { Points } from "three";
import { SolidObjectRule } from "../solidObject/SolidObjectRule";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
export declare type PointsRule = SolidObjectRule<PointsCompiler, PointsConfig, PointsCompilerTarget, Points>;
export declare const PointsRule: PointsRule;
