
import { Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
import { PointsRule } from "./PointsRule";

export class PointsDataSupport extends ObjectDataSupport<
  PointsRule,
  PointsCompiler,
  PointsConfig,
  PointsCompilerTarget,
  Points
> {

  MODULE: MODULETYPE = MODULETYPE.POINTS

  constructor (data?: PointsCompilerTarget) {
    !data && (data = {})
    super(PointsRule, data)
  }
}