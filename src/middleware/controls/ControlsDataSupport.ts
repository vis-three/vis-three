import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsCompiler, ControlsCompilerTarget } from "./ControlsCompiler";
import { getTransformControlsConfig } from "./ControlsConfig";
import { ControlsRule } from "./ControlsRule";

export class ControlsDataSupport extends DataSupport<
  ControlsCompilerTarget,
  ControlsCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.CONTROLS;

  constructor(data?: ControlsCompilerTarget, ignore?: IgnoreAttribute) {
    !data && (data = {});
    super(ControlsRule, data, ignore);
  }
}
