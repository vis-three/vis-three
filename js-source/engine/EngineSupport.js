import { Engine, ENGINEPLUGIN } from "./Engine";
export class EngineSupport extends Engine {
    IS_ENGINESUPPORT = true;
    constructor(parameters) {
        super();
        this.install(ENGINEPLUGIN.LOADERMANAGER)
            .install(ENGINEPLUGIN.RESOURCEMANAGER)
            .install(ENGINEPLUGIN.DATASUPPORTMANAGER, parameters?.dataSupportManager)
            .install(ENGINEPLUGIN.COMPILERMANAGER);
    }
    loadConfig(config, callback) {
        const loadLifeCycle = () => {
            const dataSupportManager = this.dataSupportManager;
            // 生成贴图
            config.texture && dataSupportManager.load({ texture: config.texture });
            // 生成材质
            config.material && dataSupportManager.load({ material: config.material });
            // 其他
            delete config.texture;
            delete config.material;
            dataSupportManager.load(config);
        };
        // 导入外部资源
        if (config.assets && config.assets.length) {
            this.loaderManager.reset().load(config.assets);
            const mappedFun = (event) => {
                delete config.assets;
                loadLifeCycle();
                this.resourceManager.removeEventListener('mapped', mappedFun);
                callback && callback(event);
            };
            this.resourceManager.addEventListener('mapped', mappedFun);
        }
        else {
            loadLifeCycle();
            callback && callback();
        }
        return this;
    }
    loadConfigAsync(config) {
        return new Promise((resolve, reject) => {
            const loadLifeCycle = () => {
                const dataSupportManager = this.dataSupportManager;
                // 生成贴图
                config.texture && dataSupportManager.load({ texture: config.texture });
                // 生成材质
                config.material && dataSupportManager.load({ material: config.material });
                // 其他
                delete config.texture;
                delete config.material;
                dataSupportManager.load(config);
            };
            // 导入外部资源
            if (config.assets && config.assets.length) {
                this.loaderManager.reset().load(config.assets);
                const mappedFun = (event) => {
                    delete config.assets;
                    loadLifeCycle();
                    this.resourceManager.removeEventListener('mapped', mappedFun);
                    resolve(event);
                };
                this.resourceManager.addEventListener('mapped', mappedFun);
            }
            else {
                loadLifeCycle();
                resolve(undefined);
            }
        });
    }
}
//# sourceMappingURL=EngineSupport.js.map