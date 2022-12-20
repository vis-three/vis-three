import { LoadedEvent, LoaderManager, LoadUnit } from "./LoaderManager";
import { Engine, Plugin } from "@vis-three/core";
export * from "./LoaderManager";
export interface LoaderManagerEngine extends Engine {
    loaderManager: LoaderManager;
    loadResources: (urlList: Array<LoadUnit>, callback: (err: Error | undefined, event?: LoadedEvent) => void) => LoaderManagerEngine;
    loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}
export declare const LOADER_MANAGER_PLUGIN: string;
export declare const LoaderManagerPlugin: Plugin<LoaderManagerEngine>;
