import { BaseEvent } from "three";
import { ModelingEngine } from "../../main";
import { DataSupportManager } from "../../manager/DataSupportManager";
import { ResourceManager } from "../../manager/ResourceManager";
import { Compiler } from "../../middleware/Compiler";
import { MODULETYPE } from "../constants/MODULETYPE";
import { OBJECTEVENT } from "../constants/OBJECTEVENT";
export interface ModelingEngineSupportParameters {
    dom?: HTMLElement;
    dataSupportManager: DataSupportManager;
    resourceManager: ResourceManager;
}
export interface MESActiveEvent extends BaseEvent {
    type: OBJECTEVENT.ACTIVE;
    vidSet: Set<string>;
}
export interface MESHoverEvent extends BaseEvent {
    type: OBJECTEVENT.HOVER;
    vidSet: Set<string>;
}
export declare class ModelingEngineSupport extends ModelingEngine {
    private compilerMap;
    private resourceManager;
    private dataSupportManager;
    private objectConfigMap;
    private cacheDefaultCamera?;
    constructor(parameters: ModelingEngineSupportParameters);
    getDataSupportManager(): DataSupportManager;
    getResourceManager(): ResourceManager;
    getCompiler<C extends Compiler>(module: MODULETYPE): C;
    setCameraByVid(vid: string): this;
    setHoverObjects(...vidList: string[]): this;
    setActiveObjects(...vidList: string[]): this;
}
