import { Engine, EnginePlugin } from "./Engine";
export class ModelingEngineSupport extends Engine {
    IS_ENGINESUPPORT = true;
    constructor(parameters) {
        super();
        this.install(EnginePlugin.WEBGLRENDERER, {
            antialias: true,
            alpha: true
        })
            .install(EnginePlugin.MODELINGSCENE, {
            hasDefaultPerspectiveCamera: true,
            hasDefaultOrthographicCamera: true,
            hasAxesHelper: true,
            hasGridHelper: true,
            hasDisplayMode: true,
            displayMode: 'env'
        })
            .install(EnginePlugin.RENDERMANAGER)
            .install(EnginePlugin.STATS)
            .install(EnginePlugin.EFFECTCOMPOSER, {
            WebGLMultisampleRenderTarget: true
        })
            .install(EnginePlugin.ORBITCONTROLS)
            .install(EnginePlugin.POINTERMANAGER)
            .install(EnginePlugin.EVENTMANAGER)
            .install(EnginePlugin.TRANSFORMCONTROLS)
            .install(EnginePlugin.LOADERMANAGER)
            .install(EnginePlugin.RESOURCEMANAGER);
        if (parameters) {
            this.install(EnginePlugin.DATASUPPORTMANAGER, parameters.dataSupportManager);
        }
        else {
            this.install(EnginePlugin.DATASUPPORTMANAGER);
        }
        this.install(EnginePlugin.COMPILERMANAGER);
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
}
//# sourceMappingURL=ModelingEngineSupport.js.map