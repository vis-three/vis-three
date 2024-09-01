import { LoadedEvent, LoaderManager, LoaderManagerParameters, LoadUnit } from "./LoaderManager";
import { Engine, Plugin } from "@vis-three/core";
export * from "./LoaderManager";
export interface LoaderManagerEngine extends Engine {
    /**资源加载器管理器 */
    loaderManager: LoaderManager;
    /**加载资源函数 */
    loadResources: (urlList: Array<LoadUnit>, callback: (err: Error | undefined, event?: LoadedEvent) => void) => LoaderManagerEngine;
    /**异步加载资源函数 */
    loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}
export interface LoaderManagerPluginParameters extends LoaderManagerParameters {
    /**公共前缀路径 */
    path?: string;
}
export declare const LOADER_MANAGER_PLUGIN: string;
export declare const LoaderManagerPlugin: Plugin<LoaderManagerEngine, LoaderManagerPluginParameters>;
