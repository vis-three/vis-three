import { DataSupport } from "../../core/DataSupport";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
import { LineRule } from "./LineRule";

export class LineDataSupport extends DataSupport<LineCompilerTarget, LineCompiler> {
  constructor (data?: LineCompilerTarget) {
    !data && (data = {})
    super(LineRule, data)
  }
}