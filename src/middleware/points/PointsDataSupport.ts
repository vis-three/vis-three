import { Points } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
import { PointsRule } from "./PointsRule";

export class PointsDataSupport extends SolidObjectDataSupport<
  PointsConfig,
  Points,
  PointsCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.POINTS;

  constructor(data: Array<PointsConfig> = []) {
    super(PointsRule, data);
  }
}
