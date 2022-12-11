import { MappedEvent } from "../ResourceManagerPlugin/ResourceManager";
import { Plugin } from "../plugin";
import {
  LoadedEvent,
  LoaderManager,
  LoaderManagerParameters,
  LOADER_EVENT,
  LoadUnit,
} from "./LoaderManager";
import { ResourceManagerEngine } from "../ResourceManagerPlugin";
import { Engine } from "../../engine";

export * from "./LoaderManager";

export interface LoaderManagerEngine extends Engine {
  loaderManager: LoaderManager;
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: LoadedEvent) => void
  ) => LoaderManagerEngine;
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<LoadedEvent>;
}

export interface LoaderMappingEngine extends ResourceManagerEngine {
  loaderManager: LoaderManager;
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: MappedEvent) => void
  ) => LoaderMappingEngine;
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;
}

export const LoaderManagerPlugin: Plugin<LoaderManagerEngine> = function (
  params?: LoaderManagerParameters
) {
  return {
    name: "LoaderManagerPlugin",
    install(engine) {
      const loaderManager = new LoaderManager(params);
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
    installDeps: {
      ResourceManagerPlugin(engine: LoaderMappingEngine) {
        engine.loadResources = (
          urlList: Array<LoadUnit>,
          callback: (err: Error | undefined, event?: MappedEvent) => void
        ) => {
          const lodedFun = (event: MappedEvent) => {
            callback(undefined, event);
            engine.resourceManager.removeEventListener<MappedEvent>(
              "mapped",
              lodedFun
            );
          };

          try {
            engine.resourceManager.addEventListener<MappedEvent>(
              "mapped",
              lodedFun
            );
          } catch (error) {
            callback(error as Error);
          }
          engine.loaderManager.load(urlList);
          return engine;
        };

        engine.loadResourcesAsync = (
          urlList: Array<LoadUnit>
        ): Promise<MappedEvent> => {
          return new Promise((resolve, reject) => {
            const lodedFun = (event: MappedEvent) => {
              resolve(event);
              engine.resourceManager.removeEventListener<MappedEvent>(
                "mapped",
                lodedFun
              );
            };

            try {
              engine.resourceManager.addEventListener<MappedEvent>(
                "mapped",
                lodedFun
              );
            } catch (error) {
              reject(error);
            }

            engine.loaderManager.load(urlList);
          });
        };
      },
    },
    dispose() {},
  };
};
