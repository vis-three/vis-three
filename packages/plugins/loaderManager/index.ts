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
  loaderManager: LoaderManager;
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: LoadedEvent) => void
  ) => LoaderManagerEngine;
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}

export interface LoaderManagerPluginParameters extends LoaderManagerParameters {
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
        const lodedFun = (event: LoadedEvent) => {
          callback(undefined, event);
          loaderManager.removeEventListener<LoadedEvent>(
            LOADER_EVENT.LOADED,
            lodedFun
          );
        };

        try {
          loaderManager.addEventListener<LoadedEvent>(
            LOADER_EVENT.LOADED,
            lodedFun
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
          const lodedFun = (event: LoadedEvent) => {
            resolve(event);
            loaderManager!.removeEventListener<LoadedEvent>(
              LOADER_EVENT.LOADED,
              lodedFun
            );
          };

          try {
            loaderManager!.addEventListener<LoadedEvent>(
              LOADER_EVENT.LOADED,
              lodedFun
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
