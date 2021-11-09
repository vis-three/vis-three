import { EventDispatcher, Object3D, Texture } from "three";
export var VisResourceManagerEventType;
(function (VisResourceManagerEventType) {
    VisResourceManagerEventType["MAPPED"] = "mapped";
})(VisResourceManagerEventType || (VisResourceManagerEventType = {}));
// TODO: 枚举贴图类型，几何类型，材质类型
export class ResourceManager extends EventDispatcher {
    mappingResourceMap = new Map(); // mappingUrl -> source
    configMappingMap = new Map(); // url -> config -> mappingUrl
    constructor() {
        super();
    }
    mappingResource(resourceMap) {
        const mappingResourceMap = this.mappingResourceMap;
        const configMappingMap = this.configMappingMap;
        // 递归映射物体
        const recursionMappingObject = function (url, object) {
            // TODO: 区分灯光相机等物体
            const config = {
                type: `Vis${object.type}`
            };
            let mappingUrl = '';
            // 映射几何配置
            if (object.geometry) {
                // TODO: 获取锚点位置
                mappingUrl = `${url}.geometry`;
                mappingResourceMap.set(mappingUrl, object.geometry);
                config.geometry = mappingUrl;
            }
            // 映射材质配置 TODO: 映射贴图配置
            if (object.material) {
                // TODO: 获取材质的参数
                const material = object.material;
                if (material instanceof Array) {
                    config.material = [];
                    material.forEach((materialChild, i, arr) => {
                        mappingUrl = `${url}.material.${i}`;
                        mappingResourceMap.set(mappingUrl, materialChild);
                        config.material[i] = mappingUrl;
                    });
                }
                else {
                    mappingUrl = `${url}.material`;
                    mappingResourceMap.set(mappingUrl, material);
                    config.material = mappingUrl;
                }
            }
            // 映射子项配置
            if (object.children.length) {
                object.children.forEach((child, i, arr) => {
                    mappingUrl = `${url}.children.${i}`;
                    config.children[i] = recursionMappingObject(mappingUrl, child);
                });
            }
            return config;
        };
        resourceMap.forEach((resource, url) => {
            if (resource instanceof Texture) {
                mappingResourceMap.set(url, resource);
                // this.configMappingMap.set(url, )
            }
            else if (resource instanceof Object3D) {
                configMappingMap.set(url, recursionMappingObject(url, resource));
            }
        });
        this.dispatchEvent({
            type: 'mapped',
            mappingResourceMap: this.mappingResourceMap,
            configMappingMap: this.configMappingMap
        });
        return this;
    }
    // TODO: 枚举贴图类型，几何类型，材质类型
    getResource(mappingUrl) {
        return this.mappingResourceMap.get(mappingUrl);
    }
    // TODO: 枚举贴图类型，几何类型，材质类型
    getConfig(url) {
        return this.configMappingMap.get(url);
    }
    // TODO: dispose
    dispose() { }
}
//# sourceMappingURL=ResourceManager.js.map