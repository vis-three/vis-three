import { Engine } from "../../engine";
import { Plugin } from "../plugin";
import { ResourceManager } from "./ResourceManager";
export interface ResourceManagerPluginParameters {
    resources: {
        [key: string]: any;
    };
}
export interface ResourceManagerEngine extends Engine {
    resourceManager: ResourceManager;
    registerResources: (resourceMap: Record<string, unknown>) => ResourceManagerEngine;
}
declare const ResourceManagerPlugin: Plugin<ResourceManagerEngine>;
export default ResourceManagerPlugin;
