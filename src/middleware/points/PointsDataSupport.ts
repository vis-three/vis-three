import { Points } from "three";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsCompiler, PointsCompilerTarget } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
import { PointsRule } from "./PointsRule";

export class PointsDataSupport extends SolidObjectDataSupport<
  PointsRule,
  PointsCompiler,
  PointsConfig,
  PointsCompilerTarget,
  Points
> {
  MODULE: MODULETYPE = MODULETYPE.POINTS;

  constructor(data?: PointsCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(PointsRule, data, ignore);
  }
}
