import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { PassCompiler, PassCompilerTarget } from "./PassCompiler";
export declare class PassDataSupport extends DataSupport<PassCompilerTarget, PassCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: PassCompilerTarget);
}
