import { ModelingEngine } from "../../main";
import { DataSupportManager } from "../../manager/DataSupportManager";
import { ResourceManager } from "../../manager/ResourceManager";
import { Compiler } from "../../middleware/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
export interface ModelingEngineSupportParameters {
    dom?: HTMLElement;
    dataSupportManager: DataSupportManager;
    resourceManager: ResourceManager;
}
export declare class ModelingEngineSupport extends ModelingEngine {
    private compilerMap;
    private resourceManager;
    private dataSupportManager;
    private objectConfigMap;
    constructor(parameters: ModelingEngineSupportParameters);
    getDataSupportManager(): DataSupportManager;
    getResourceManager(): ResourceManager;
    getCompiler<C extends Compiler>(module: MODULETYPE): C;
}
