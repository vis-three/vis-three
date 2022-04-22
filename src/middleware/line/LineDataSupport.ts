import { Line } from "three";
import { MODULETYPE } from "../constants/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
import { LineRule } from "./LineRule";

export class LineDataSupport extends SolidObjectDataSupport<
  LineRule,
  LineCompiler,
  LineConfig,
  LineCompilerTarget,
  Line
> {
  MODULE: MODULETYPE = MODULETYPE.LINE;

  constructor(data?: LineCompilerTarget) {
    !data && (data = {});
    super(LineRule, data);
  }
}
