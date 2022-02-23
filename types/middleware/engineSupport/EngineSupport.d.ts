import { Engine, ENGINEPLUGIN, EnginePluginParams } from '../../engine/Engine';
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
    mappingResource(resourceMap: {
        [key: string]: unknown;
    }): this;
    load(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    support(): this;
    install(plugin: ENGINEPLUGIN, params?: EnginePluginParams): this;
}
