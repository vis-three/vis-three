import { MODULETYPE } from "../main";
import { Engine, ENGINEPLUGIN } from "./Engine";
export class EngineSupport extends Engine {
    IS_ENGINESUPPORT = true;
    constructor(parameters) {
        super();
        this.install(ENGINEPLUGIN.LOADERMANAGER)
            .install(ENGINEPLUGIN.RESOURCEMANAGER)
            .install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters)
            .install(ENGINEPLUGIN.COMPILERMANAGER);
    }
    loadLifeCycle(config) {
        const dataSupportManager = this.dataSupportManager;
        // 生成贴图
        config.texture && dataSupportManager.load({ texture: config.texture });
        // 生成材质
        config.material && dataSupportManager.load({ material: config.material });
        // 其他
        delete config.texture;
        delete config.material;
        dataSupportManager.load(config);
    }
    removeLifeCycle(config) {
        const dataSupportManager = this.dataSupportManager;
        const texture = config[MODULETYPE.TEXTURE] || {};
        const material = config[MODULETYPE.MATERIAL] || {};
        const assets = config.assets || [];
        delete config.texture;
        delete config.material;
        delete config.assets;
        // 先删物体
        dataSupportManager.remove(config);
        // 再删材质
        dataSupportManager.remove({ [MODULETYPE.MATERIAL]: material });
        // 再删贴图
        dataSupportManager.remove({ [MODULETYPE.TEXTURE]: texture });
        // 再清空外部资源缓存
        const resourceManager = this.resourceManager;
        const loaderManager = this.loaderManager;
        assets.forEach(url => {
            resourceManager.remove(url);
            loaderManager.remove(url);
        });
    }
    loadConfig(config, callback) {
        this.renderManager.stop();
        // 导入外部资源
        if (config.assets && config.assets.length) {
            this.loaderManager.reset().load(config.assets);
            const mappedFun = (event) => {
                delete config.assets;
                this.loadLifeCycle(config);
                this.resourceManager.removeEventListener('mapped', mappedFun);
                callback && callback(event);
                this.renderManager.play();
            };
            this.resourceManager.addEventListener('mapped', mappedFun);
        }
        else {
            this.loadLifeCycle(config);
            callback && callback();
            this.renderManager.play();
        }
        return this;
    }
    loadConfigAsync(config) {
        return new Promise((resolve, reject) => {
            this.renderManager.stop();
            // 导入外部资源
            if (config.assets && config.assets.length) {
                this.loaderManager.reset().load(config.assets);
                const mappedFun = (event) => {
                    delete config.assets;
                    this.loadLifeCycle(config);
                    this.resourceManager.removeEventListener('mapped', mappedFun);
                    this.renderManager.play();
                    resolve(event);
                };
                this.resourceManager.addEventListener('mapped', mappedFun);
            }
            else {
                this.loadLifeCycle(config);
                this.renderManager.play();
                resolve(undefined);
            }
        });
    }
    removeConfig(config) {
        this.removeLifeCycle(config);
    }
}
//# sourceMappingURL=EngineSupport.js.map