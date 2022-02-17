import { Engine, EnginePlugin, EnginePluginParams } from '../../engine/Engine';
import { LoaderManager } from '../../manager/LoaderManager';
import { MappedEvent, ResourceManager } from '../../manager/ResourceManager';
import { DataSupportManager, LoadOptions } from '../../manager/DataSupportManager';
import { CompilerManager } from '../../manager/CompilerManager';
export interface EngineSupportLoadOptions extends LoadOptions {
    assets?: string[];
}
export interface EngineSupportParameters {
    dataSupportManager: DataSupportManager;
}
export declare class EngineSupport extends Engine {
    static pluginHandler: Map<string, Function> | undefined;
    dataSupportManager: DataSupportManager;
    resourceManager: ResourceManager;
    loaderManager: LoaderManager;
    compilerManager?: CompilerManager;
    constructor(parameters?: EngineSupportParameters);
    mappingResource(resourceMap: Map<string, unknown>): this;
    load(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): void;
    support(): this;
    install(plugin: EnginePlugin, params?: EnginePluginParams): this;
}
