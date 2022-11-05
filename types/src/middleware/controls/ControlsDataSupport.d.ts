import { CompilerTarget } from "../../core/Compiler";
import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/DataContainer";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsAllType, ControlsCompiler } from "./ControlsCompiler";
import { ControlsAllConfig } from "./ControlsConfig";
export declare class ControlsDataSupport extends DataSupport<
  ControlsAllConfig,
  ControlsAllType,
  ControlsCompiler
> {
  MODULE: MODULETYPE;
  constructor(
    data?: CompilerTarget<ControlsAllConfig>,
    ignore?: IgnoreAttribute
  );
}
