import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsAllType, ControlsCompiler } from "./ControlsCompiler";
import { ControlsAllConfig } from "./ControlsConfig";
import { ControlsRule } from "./ControlsRule";

export class ControlsDataSupport extends DataSupport<
  ControlsAllConfig,
  ControlsAllType,
  ControlsCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.CONTROLS;

  constructor(
    data?: CompilerTarget<ControlsAllConfig>,
    ignore?: IgnoreAttribute
  ) {
    !data && (data = {});
    super(ControlsRule, data, ignore);
  }
}
