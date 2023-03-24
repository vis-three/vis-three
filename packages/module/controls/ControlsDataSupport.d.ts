import { DataSupport } from "../module";
import { MODULETYPE } from "../constants";
import { ControlsAllType, ControlsCompiler } from "./ControlsCompiler";
import { ControlsAllConfig } from "./ControlsConfig";
export declare class ControlsDataSupport extends DataSupport<ControlsAllConfig, ControlsAllType, ControlsCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<ControlsAllConfig>);
}
