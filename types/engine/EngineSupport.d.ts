import { DataSupportManager, LoadOptions } from "../manager/DataSupportManager";
import { MappedEvent } from "../manager/ResourceManager";
export interface EngineSupportParameters {
    dataSupportManager: DataSupportManager;
}
export interface EngineSupportLoadOptions extends LoadOptions {
    assets?: string[];
}
export interface EngineSupport {
    IS_ENGINESUPPORT: boolean;
    loadConfig: (config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void) => this;
}
