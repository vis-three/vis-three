import { SolidObjectRule } from "@vis-three/module-solid-object";
import { Points } from "three";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
export type PointsRule = SolidObjectRule<PointsCompiler, PointsConfig, Points>;
export declare const PointsRule: PointsRule;
