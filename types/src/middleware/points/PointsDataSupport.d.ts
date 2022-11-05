import { Points } from "three";
import { CompilerTarget } from "../../core/Compiler";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { PointsCompiler } from "./PointsCompiler";
import { PointsConfig } from "./PointsConfig";
export declare class PointsDataSupport extends SolidObjectDataSupport<
  PointsConfig,
  Points,
  PointsCompiler
> {
  MODULE: MODULETYPE;
  constructor(data?: CompilerTarget<PointsConfig>, ignore?: IgnoreAttribute);
}
