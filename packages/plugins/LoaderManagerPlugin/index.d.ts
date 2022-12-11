import { MappedEvent } from "../ResourceManagerPlugin/ResourceManager";
import { Plugin } from "../plugin";
import { LoadedEvent, LoaderManager, LoadUnit } from "./LoaderManager";
import { ResourceManagerEngine } from "../ResourceManagerPlugin";
import { Engine } from "../../engine";
export interface LoaderManagerEngine extends Engine {
    loaderManager: LoaderManager;
    loadResources: (urlList: Array<LoadUnit>, callback: (err: Error | undefined, event?: LoadedEvent) => void) => LoaderManagerEngine;
    loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}
export interface LoaderMappingEngine extends ResourceManagerEngine {
    loaderManager: LoaderManager;
    loadResources: (urlList: Array<LoadUnit>, callback: (err: Error | undefined, event?: MappedEvent) => void) => LoaderMappingEngine;
    loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;
}
declare const LoaderManagerPlugin: Plugin<LoaderManagerEngine>;
export default LoaderManagerPlugin;
