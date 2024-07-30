import {
  LoadedEvent,
  LoaderManager,
  LoaderManagerParameters,
  LOADER_EVENT,
  LoadUnit,
} from "./LoaderManager";

import { Engine, Plugin } from "@vis-three/core";

import { Optional, transPkgName } from "@vis-three/utils";
import { name as pkgname } from "./package.json";

export * from "./LoaderManager";

export interface LoaderManagerEngine extends Engine {
  /**资源加载器管理器 */
  loaderManager: LoaderManager;
  /**加载资源函数 */
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: LoadedEvent) => void
  ) => LoaderManagerEngine;
  /**异步加载资源函数 */
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}

export interface LoaderManagerPluginParameters extends LoaderManagerParameters {
  /**公共前缀路径 */
  path?: string;
}

export const LOADER_MANAGER_PLUGIN = transPkgName(pkgname);

export const LoaderManagerPlugin: Plugin<
  LoaderManagerEngine,
  LoaderManagerPluginParameters
> = function (params?: LoaderManagerPluginParameters) {
  return {
    name: LOADER_MANAGER_PLUGIN,
    install(engine) {
      const loaderManager = new LoaderManager(params);

      if (params?.path) {
        loaderManager.setPath(params.path);
      }

      engine.loaderManager = loaderManager;

      engine.loadResources = (
        urlList: Array<LoadUnit>,
        callback: (err: Error | undefined, event?: LoadedEvent) => void
      ) => {
        const loadedFun = (event: LoadedEvent) => {
          callback(undefined, event);
          loaderManager.removeEventListener<LoadedEvent>(
            LOADER_EVENT.LOADED,
            loadedFun
          );
        };

        try {
          loaderManager.addEventListener<LoadedEvent>(
            LOADER_EVENT.LOADED,
            loadedFun
          );
        } catch (error) {
          callback(error as Error);
        }
        loaderManager.load(urlList);

        return engine;
      };

      engine.loadResourcesAsync = (
        urlList: Array<LoadUnit>
      ): Promise<LoadedEvent> => {
        return new Promise((resolve, reject) => {
          const loadedFun = (event: LoadedEvent) => {
            resolve(event);
            loaderManager!.removeEventListener<LoadedEvent>(
              LOADER_EVENT.LOADED,
              loadedFun
            );
          };

          try {
            loaderManager!.addEventListener<LoadedEvent>(
              LOADER_EVENT.LOADED,
              loadedFun
            );
          } catch (error) {
            reject(error);
          }

          loaderManager!.load(urlList);
        });
      };
    },
    dispose(
      engine: Optional<
        LoaderManagerEngine,
        "loaderManager" | "loadResources" | "loadResourcesAsync"
      >
    ) {
      engine.loaderManager!.dispose();

      delete engine.loaderManager;
      delete engine.loadResources;
      delete engine.loadResourcesAsync;
    },
  };
};
