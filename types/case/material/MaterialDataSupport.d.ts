import { DataSupport } from "../../middleware/DataSupport";
import { MaterialCompiler, MaterialCompilerTarget } from "./MaterialCompiler";
export declare class MaterialDataSupport extends DataSupport<MaterialCompilerTarget, MaterialCompiler> {
    constructor(data?: MaterialCompilerTarget);
}
