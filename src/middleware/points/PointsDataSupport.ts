
import { Points } from "three";
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
  constructor (data?: PointsCompilerTarget) {
    !data && (data = {})
    super(PointsRule, data)
  }
}