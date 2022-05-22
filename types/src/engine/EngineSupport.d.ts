import { Object3D } from "three";
import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager, DataSupportManagerParameters, LoadOptions } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { SymbolConfig } from "../middleware/common/CommonConfig";
import { Engine } from "./Engine";
export declare type EngineSupportParameters = DataSupportManagerParameters;
export interface EngineSupportLoadOptions extends LoadOptions {
    assets?: string[];
}
export declare class EngineSupport extends Engine {
    IS_ENGINESUPPORT: boolean;
    loaderManager: LoaderManager;
    resourceManager: ResourceManager;
    dataSupportManager: DataSupportManager;
    compilerManager: CompilerManager;
    loadResources: (urlList: Array<string>) => this;
    registerResources: (resourceMap: {
        [key: string]: unknown;
    }) => this;
    toJSON: () => string;
    exportConfig: (compress: boolean) => LoadOptions;
    applyConfig: <T extends SymbolConfig>(...configs: T[]) => this;
    reactiveConfig: <T extends SymbolConfig>(config: T) => T;
    getConfigBySymbol: <T extends SymbolConfig>(vid: string) => T | null;
    removeConfigBySymbol: (vid: string) => this;
    getObjectSymbol: <O extends Object3D>(object: O) => SymbolConfig["vid"] | null;
    getObjectBySymbol: (vid: string) => Object3D | null;
    constructor(parameters?: EngineSupportParameters);
    private loadLifeCycle;
    private removeLifeCycle;
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    loadConfigAsync(config: EngineSupportLoadOptions): Promise<MappedEvent | undefined>;
    removeConfig(config: EngineSupportLoadOptions): void;
    getObjectConfig(object: any): SymbolConfig | null;
}
