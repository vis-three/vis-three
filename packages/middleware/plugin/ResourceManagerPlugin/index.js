import { ENGINE_EVENT } from "@vis-three/core";
import { ResourceManager } from "./ResourceManager";
export * from "./ResourceManager";
export * from "./Parser";
export const RESOURCE_MANAGER_PLUGIN = "ResourceManagerPlugin";
export const ResourceManagerPlugin = function (params = {}) {
    return {
        name: RESOURCE_MANAGER_PLUGIN,
        install(engine) {
            const resourceManager = new ResourceManager(params.resources);
            engine.resourceManager = resourceManager;
            engine.registerResources = (resourceMap) => {
                const map = new Map();
                Object.keys(resourceMap).forEach((key) => {
                    map.set(key, resourceMap[key]);
                });
                resourceManager.mappingResource(map);
                return engine;
            };
        },
        dispose(engine) {
            engine.addEventListener(ENGINE_EVENT.DISPOSE, () => {
                engine.resourceManager.dispose();
            });
        },
    };
};
