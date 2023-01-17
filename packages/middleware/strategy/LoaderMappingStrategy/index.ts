import { Strategy } from "@vis-three/core";
import {
  LoadedEvent,
  LoaderManager,
  LOADER_EVENT,
  LOADER_MANAGER_PLUGIN,
  LoadUnit,
} from "@vis-three/loader-manager-plugin";
import {
  MappedEvent,
  ResourceManagerEngine,
  RESOURCE_EVENT,
  RESOURCE_MANAGER_PLUGIN,
} from "../../plugin/ResourceManagerPlugin";

export interface LoaderMappingEngine extends ResourceManagerEngine {
  loaderManager: LoaderManager;
  loadResources: (
    urlList: Array<LoadUnit>,
    callback: (err: Error | undefined, event?: MappedEvent) => void
  ) => LoaderMappingEngine;
  loadResourcesAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;
}

export const LOADER_MAPPING_STRATEGY = "LoaderMappingStrategy";

export const LoaderMappingStrategy: Strategy<LoaderMappingEngine> =
  function () {
    let cacheLoadResources: (
      urlList: Array<LoadUnit>,
      callback: (err: Error | undefined, event?: MappedEvent) => void
    ) => LoaderMappingEngine;

    let cacheAsync: (urlList: Array<LoadUnit>) => Promise<MappedEvent>;

    return {
      name: LOADER_MAPPING_STRATEGY,
      condition: [RESOURCE_MANAGER_PLUGIN, LOADER_MANAGER_PLUGIN],
      exec(engine) {
        cacheLoadResources = engine.loadResources;

        engine.loadResources = (
          urlList: Array<LoadUnit>,
          callback: (err: Error | undefined, event?: MappedEvent) => void
        ) => {
          const lodedFun = (event: MappedEvent) => {
            callback(undefined, event);
            engine.resourceManager.removeEventListener<MappedEvent>(
              LOADER_EVENT.LOADED,
              lodedFun
            );
          };

          try {
            engine.resourceManager.addEventListener<MappedEvent>(
              LOADER_EVENT.LOADED,
              lodedFun
            );
          } catch (error) {
            callback(error as Error);
          }
          engine.loaderManager.reset().load(urlList);
          return engine;
        };

        cacheAsync = engine.loadResourcesAsync;

        engine.loadResourcesAsync = (
          urlList: Array<LoadUnit>
        ): Promise<MappedEvent> => {
          return new Promise((resolve, reject) => {
            try {
              engine.loaderManager.once<LoadedEvent>(
                LOADER_EVENT.LOADED,
                (e: LoadedEvent) => {
                  engine.resourceManager.once<MappedEvent>(
                    RESOURCE_EVENT.MAPPED,
                    (event) => {
                      resolve(event);
                    }
                  );

                  const map = new Map();

                  urlList.forEach((unit) => {
                    if (typeof unit === "string") {
                      map.set(unit, e.resourceMap.get(unit));
                    } else {
                      map.set(unit.url, e.resourceMap.get(unit.url));
                    }
                  });
                  engine.resourceManager.mappingResource(map);
                }
              );
            } catch (error) {
              reject(error);
            }

            engine.loaderManager.reset().load(urlList);
          });
        };
      },
      rollback(engine) {
        engine.loadResources = cacheLoadResources;
        engine.loadResourcesAsync = cacheAsync;
      },
    };
  };
