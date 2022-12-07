import { Engine } from "../engine/Engine";
import { LoadedEvent } from "../manager/LoaderManager";
import { ResourceManager } from "../manager/ResourceManager";
import { Plugin } from "./plugin";

export interface ResourceManagerPluginParameters {
  resources: { [key: string]: any };
}

export const ResourceManagerPlugin: Plugin<ResourceManagerPluginParameters> =
  function (this: Engine, params: ResourceManagerPluginParameters): boolean {
    if (this.resourceManager) {
      console.warn("engine has installed resourceManager plugin.");
      return false;
    }

    const resourceManager = new ResourceManager(params.resources);

    this.resourceManager = resourceManager;

    if (this.loaderManager) {
      this.loaderManager.addEventListener<LoadedEvent>("loaded", (event) => {
        this.resourceManager!.mappingResource(event.resourceMap);
      });
    }

    this.registerResources = (resourceMap: {
      [key: string]: unknown;
    }): Engine => {
      const map = new Map();
      Object.keys(resourceMap).forEach((key) => {
        map.set(key, resourceMap[key]);
      });
      this.resourceManager!.mappingResource(map);
      return this;
    };

    this.addEventListener("dispose", () => {
      this.resourceManager!.dispose();
    });

    return true;
  };
