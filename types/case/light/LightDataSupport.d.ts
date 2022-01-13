import { DataSupport } from "../../middleware/DataSupport";
import { LightCompiler, LightCompilerTarget } from "./LightCompiler";
export declare class LightDataSupport extends DataSupport<LightCompilerTarget, LightCompiler> {
    constructor(data?: LightCompilerTarget);
}
