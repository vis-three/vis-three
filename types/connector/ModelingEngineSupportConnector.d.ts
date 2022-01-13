import { ModelingEngineSupport } from '../main';
import { DataSupportManager } from '../manager/DataSupportManager';
import { ResourceManager } from '../manager/ResourceManager';
export interface ModelingConnectorParameters {
    domList: Array<HTMLElement>;
    dataSupportManager?: DataSupportManager;
    resourceManager?: ResourceManager;
}
export declare class ModelingEngineSupportConnector {
    private domEngineMap;
    constructor(parameters: ModelingConnectorParameters);
    getEngineSupport(dom: HTMLElement): ModelingEngineSupport | undefined;
}
