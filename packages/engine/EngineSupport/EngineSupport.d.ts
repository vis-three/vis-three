import { SymbolConfig } from "@vis-three/middleware";
import { CompilerManagerEngine } from "../plugin/CompilerManagerPlugin";
import { CompilerManager } from "../plugin/CompilerManagerPlugin/CompilerManager";
import { DataSupportEngine } from "../plugin/DataSupportManagerPlugin";
import { DataSupportManager, DataSupportManagerParameters, LoadOptions } from "../plugin/DataSupportManagerPlugin/DataSupportManager";
import { EventManagerEngine } from "../plugin/EventManagerPlugin";
import { EventManager } from "../plugin/EventManagerPlugin/EventManager";
import { LoaderMappingEngine } from "../plugin/LoaderManagerPlugin";
import { LoaderManager, LoadUnit } from "../plugin/LoaderManagerPlugin/LoaderManager";
import { PointerManagerEngine } from "../plugin/PointerManagerPlugin";
import { PointerManager } from "../plugin/PointerManagerPlugin/PointerManager";
import { RenderManagerEngine } from "../plugin/RenderManagerPlugin";
import { RenderManager } from "../plugin/RenderManagerPlugin/RenderManager";
import { ResourceManagerEngine } from "../plugin/ResourceManagerPlugin";
import { MappedEvent, ResourceManager } from "../plugin/ResourceManagerPlugin/ResourceManager";
import { Engine } from "./Engine";
export type EngineSupportParameters = DataSupportManagerParameters;
export interface EngineSupportLoadOptions extends LoadOptions {
    assets?: string[];
}
export declare class EngineSupport extends Engine implements LoaderMappingEngine, PointerManagerEngine, EventManagerEngine, RenderManagerEngine, DataSupportEngine, CompilerManagerEngine {
    loaderManager: LoaderManager;
    loadResources: (urlList: LoadUnit[], callback: (err: Error | undefined, event?: MappedEvent | undefined) => void) => LoaderMappingEngine;
    loadResourcesAsync: (urlList: LoadUnit[]) => Promise<MappedEvent>;
    resourceManager: ResourceManager;
    registerResources: (resourceMap: Record<string, unknown>) => ResourceManagerEngine;
    renderManager: RenderManager;
    pointerManager: PointerManager;
    compilerManager: CompilerManager;
    getObjectSymbol: (object: any) => string | null;
    getObjectBySymbol: (vid: string) => any;
    dataSupportManager: DataSupportManager;
    applyConfig: (...args: SymbolConfig[]) => DataSupportEngine;
    getConfigBySymbol: (vid: string) => SymbolConfig | null;
    removeConfigBySymbol: (...args: string[]) => DataSupportEngine;
    toJSON: () => string;
    exportConfig: () => LoadOptions;
    eventManager: EventManager;
    constructor(parameters?: EngineSupportParameters, resources?: {
        [key: string]: any;
    });
    private loadLifeCycle;
    private removeLifeCycle;
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
    loadConfigAsync(config: EngineSupportLoadOptions): Promise<MappedEvent | undefined>;
    removeConfig(config: EngineSupportLoadOptions): void;
    getObjectConfig<O, C extends SymbolConfig>(object: O): C | null;
}
