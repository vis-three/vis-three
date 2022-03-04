import { Points } from "three";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
import { PointsRule } from "./PointsRule";
export declare class PointsDataSupport extends ObjectDataSupport<PointsRule, PointsCompiler, PointsConfig, PointsCompilerTarget, Points> {
    constructor(data?: PointsCompilerTarget);
}
