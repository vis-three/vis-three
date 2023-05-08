import { Strategy } from "@vis-three/core";
import { LoaderManager, LoadUnit } from "@vis-three/plugin-loader-manager";
import { MappedEvent, ResourceManagerEngine } from "../../plugin/ResourceManagerPlugin";
export interface LoaderMappingEngine extends ResourceManagerEngine {
    loaderManager: LoaderManager;
    loadResources: (urlList: Array<LoadUnit>, callback: (err: Error | undefined, event?: MappedEvent) => void) => LoaderMappingEngine;
    loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;
}
export declare const LOADER_MAPPING_STRATEGY = "LoaderMappingStrategy";
export declare const LoaderMappingStrategy: Strategy<LoaderMappingEngine, object>;
