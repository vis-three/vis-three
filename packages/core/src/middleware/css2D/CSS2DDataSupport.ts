import { VisCSS2DObject } from "../../optimize/VisCSS2DObject";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ObjectDataSupport } from "../object/ObjectDataSupport";
import { CSS2DCompiler } from "./CSS2DCompiler";
import { CSS2DAllType } from "./CSS2DConfig";
import { CSS2DRule } from "./CSS2DRule";

export class CSS2DDataSupport extends ObjectDataSupport<
  CSS2DAllType,
  VisCSS2DObject,
  CSS2DCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.CSS2D;
  constructor(data: Array<CSS2DAllType> = []) {
    super(CSS2DRule, data);
  }
}
