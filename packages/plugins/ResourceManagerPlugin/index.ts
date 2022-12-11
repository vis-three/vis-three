import { Engine, ENGINE_EVENT } from "../../engine";
import { LoaderMappingEngine } from "../LoaderManagerPlugin";
import {
  LoadedEvent,
  LOADER_EVENT,
} from "../LoaderManagerPlugin/LoaderManager";
import { Plugin } from "../plugin";
import { ResourceManager } from "./ResourceManager";

export * from "./ResourceManager";
export interface ResourceManagerPluginParameters {
  resources: { [key: string]: any };
}

export interface ResourceManagerEngine extends Engine {
  resourceManager: ResourceManager;
  registerResources: (
    resourceMap: Record<string, unknown>
  ) => ResourceManagerEngine;
}

export const ResourceManagerPlugin: Plugin<ResourceManagerEngine> = function (
  params: ResourceManagerPluginParameters
) {
  return {
    name: "ResourceManagerPlugin",
    install(engine) {
      const resourceManager = new ResourceManager(params.resources);

      engine.resourceManager = resourceManager;

      engine.registerResources = (resourceMap: Record<string, unknown>) => {
        const map = new Map();
        Object.keys(resourceMap).forEach((key) => {
          map.set(key, resourceMap[key]);
        });
        resourceManager.mappingResource(map);
        return engine;
      };
    },
    installDeps: {
      LoaderManagerPlugin(engine: LoaderMappingEngine) {
        engine.loaderManager.addEventListener<LoadedEvent>(
          LOADER_EVENT.LOADED,
          (event) => {
            engine.resourceManager.mappingResource(event.resourceMap);
          }
        );
      },
    },

    dispose(engine) {
      engine.addEventListener(ENGINE_EVENT.DISPOSE, () => {
        engine.resourceManager.dispose();
      });
    },
  };
};
