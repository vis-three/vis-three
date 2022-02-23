import { DataSupport } from "../../core/DataSupport";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsRule } from "./PointsRule";

export class PointsDataSupport extends DataSupport<PointsCompilerTarget, PointsCompiler> {
  constructor (data?: PointsCompilerTarget) {
    !data && (data = {})
    super(PointsRule, data)
  }
}