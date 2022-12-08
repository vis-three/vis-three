import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsAllType, ControlsCompiler } from "./ControlsCompiler";
import { ControlsAllConfig } from "./ControlsConfig";
export declare class ControlsDataSupport extends DataSupport<ControlsAllConfig, ControlsAllType, ControlsCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: Array<ControlsAllConfig>);
}
