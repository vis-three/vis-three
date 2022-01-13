import { DataSupport } from "../../middleware/DataSupport";
import { ModelCompiler, ModelCompilerTarget } from "./ModelCompiler";
export declare class ModelDataSupport extends DataSupport<ModelCompilerTarget, ModelCompiler> {
    constructor(data?: ModelCompilerTarget);
}
