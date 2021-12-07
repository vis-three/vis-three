import { ModelingEngine } from "../../main";
import { DataSupportManager } from "../../manager/DataSupportManager";
import { ResourceManager } from "../../manager/ResourceManager";
export interface ModelingEngineSupportParameters {
    dom?: HTMLElement;
    dataSupportManager: DataSupportManager;
    resourceManager: ResourceManager;
}
export declare class ModelingEngineSupport extends ModelingEngine {
    private textureCompiler;
    private materialCompiler;
    private cameraCompiler;
    private lightCompiler;
    private modelCompiler;
    private geometryCompiler;
    private rendererCompiler;
    private sceneCompiler;
    private resourceManager;
    private dataSupportManager;
    constructor(parameters: ModelingEngineSupportParameters);
    getDataSupportManager(): DataSupportManager;
}
