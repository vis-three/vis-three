import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { LineCompiler, LineCompilerTarget } from "./LineCompiler";
export declare class LineDataSupport extends DataSupport<LineCompilerTarget, LineCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: LineCompilerTarget);
}
