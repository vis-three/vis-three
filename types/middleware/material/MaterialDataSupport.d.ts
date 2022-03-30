import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { MaterialCompiler, MaterialCompilerTarget } from "./MaterialCompiler";
export declare class MaterialDataSupport extends DataSupport<MaterialCompilerTarget, MaterialCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: MaterialCompilerTarget);
}
