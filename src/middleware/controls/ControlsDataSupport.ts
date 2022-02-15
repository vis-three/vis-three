import { DataSupport } from "../../core/DataSupport";
import { ControlsCompiler, ControlsCompilerTarget } from "./ControlsCompiler";
import { getTransformControlsConfig } from "./ControlsConfig";
import { ControlsRule } from "./ControlsRule";

export class ControlsDataSupport extends DataSupport<ControlsCompilerTarget, ControlsCompiler> {
  constructor (data?: ControlsCompilerTarget) {
    !data && (data = {})
    super(ControlsRule, data)
  }
}