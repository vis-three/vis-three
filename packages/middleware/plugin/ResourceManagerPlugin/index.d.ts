import { Engine, Plugin } from "@vis-three/core";
import { ResourceManager } from "./ResourceManager";
export * from "./ResourceManager";
export * from "./Parser";
export interface ResourceManagerPluginParameters {
    resources?: {
        [key: string]: any;
    };
}
export interface ResourceManagerEngine extends Engine {
    resourceManager: ResourceManager;
    registerResources: (resourceMap: Record<string, unknown>) => ResourceManagerEngine;
}
export declare const RESOURCE_MANAGER_PLUGIN = "ResourceManagerPlugin";
export declare const ResourceManagerPlugin: Plugin<ResourceManagerEngine, ResourceManagerPluginParameters>;
