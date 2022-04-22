import { Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
import { PointsRule } from "./PointsRule";
export declare class PointsDataSupport extends SolidObjectDataSupport<PointsRule, PointsCompiler, PointsConfig, PointsCompilerTarget, Points> {
    MODULE: MODULETYPE;
    constructor(data?: PointsCompilerTarget);
}
