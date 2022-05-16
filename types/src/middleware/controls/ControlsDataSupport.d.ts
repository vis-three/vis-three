import { DataSupport } from "../../core/DataSupport";
import { IgnoreAttribute } from "../../core/ProxyBroadcast";
import { MODULETYPE } from "../constants/MODULETYPE";
import { ControlsCompiler, ControlsCompilerTarget } from "./ControlsCompiler";
export declare class ControlsDataSupport extends DataSupport<ControlsCompilerTarget, ControlsCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: ControlsCompilerTarget, ignore?: IgnoreAttribute);
}
