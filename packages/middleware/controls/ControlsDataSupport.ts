import { DataSupport } from "@vis-three/core";
import { MODULETYPE } from "../constants";
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
