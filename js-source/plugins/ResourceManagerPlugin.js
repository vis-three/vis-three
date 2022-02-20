import { ResourceManager } from "../manager/ResourceManager";
export const ResourceManagerPlugin = function (params) {
    if (this.resourceManager) {
        console.warn('engine has installed resourceManager plugin.');
        return false;
    }
    const resourceManager = new ResourceManager();
    this.resourceManager = resourceManager;
    if (this.loaderManager) {
        this.loaderManager.addEventListener('loaded', event => {
            this.resourceManager.mappingResource(event.resourceMap);
        });
    }
    this.registerResources = (resourceMap) => {
        const map = new Map();
        Object.keys(resourceMap).forEach(key => {
            map.set(key, resourceMap[key]);
        });
        this.resourceManager.mappingResource(map);
        return this;
    };
    return true;
};
//# sourceMappingURL=ResourceManagerPlugin.js.map