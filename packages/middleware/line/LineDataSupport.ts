import { Line } from "three";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { SolidObjectDataSupport } from "../solidObject/SolidDataSupport";
import { LineCompiler } from "./LineCompiler";
import { LineConfig } from "./LineConfig";
import { LineRule } from "./LineRule";

export class LineDataSupport extends SolidObjectDataSupport<
  LineConfig,
  Line,
  LineCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.LINE;

  constructor(data: Array<LineConfig> = []) {
    super(LineRule, data);
  }
}
