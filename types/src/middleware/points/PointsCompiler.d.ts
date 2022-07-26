import { Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectCompiler, SolidObjectCompilerTarget } from "../solidObject/SolidObjectCompiler";
import { PointsConfig } from "./PointsConfig";
export interface PointsCompilerTarget extends SolidObjectCompilerTarget<PointsConfig> {
}
export declare class PointsCompiler extends SolidObjectCompiler<PointsConfig, PointsCompilerTarget, Points> {
    MODULE: MODULETYPE;
    constructor();
}
