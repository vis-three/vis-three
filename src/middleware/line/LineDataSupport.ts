import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
import { LineRule } from "./LineRule";

export class LineDataSupport extends DataSupport<
  LineCompilerTarget,
  LineCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.LINE;

  constructor(data?: LineCompilerTarget) {
    !data && (data = {});
    super(LineRule, data);
  }
}
