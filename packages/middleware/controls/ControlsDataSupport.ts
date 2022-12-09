import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../../core/middleware/MODULETYPE";
import { ControlsAllType, ControlsCompiler } from "./ControlsCompiler";
import { ControlsAllConfig } from "./ControlsConfig";
import { ControlsRule } from "./ControlsRule";

export class ControlsDataSupport extends DataSupport<
  ControlsAllConfig,
  ControlsAllType,
  ControlsCompiler
> {
  MODULE: MODULETYPE = MODULETYPE.CONTROLS;

  constructor(data: Array<ControlsAllConfig> = []) {
    super(ControlsRule, data);
  }
}
