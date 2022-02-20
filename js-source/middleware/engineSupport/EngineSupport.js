import { Engine } from '../../engine/Engine';
import { LoaderManager } from '../../manager/LoaderManager';
import { ResourceManager } from '../../manager/ResourceManager';
import { EffectComposerPlugin } from '../../plugins/EffectComposerPlugin';
import { EventManagerSupportPlugin } from '../../plugins/EventManagerPlugin';
import { ModelingSceneSupportPlugin } from '../../plugins/ModelingScenePlugin';
import { OrbitControlsSupportPlugin } from '../../plugins/OrbitControlsPlugin';
import { PointerManagerPlugin } from '../../plugins/PointerManagerPlugin';
import { RendererManagerPlugin } from '../../plugins/RenderManagerPlugin';
import { SceneSupportPlugin } from '../../plugins/ScenePlugin';
import { StatsPlugin } from '../../plugins/StatsPlugin';
import { TransformControlsSupportPlugin } from '../../plugins/TransformControlsPlugin';
import { WebGLRendererSupportPlugin } from '../../plugins/WebGLRendererPlugin';
import { CameraCompiler } from '../camera/CameraCompiler';
import { MODULETYPE } from '../constants/MODULETYPE';
import { ControlsCompiler } from '../controls/ControlsCompiler';
import { GeometryCompiler } from '../geometry/GeometryCompiler';
import { LightCompiler } from '../light/LightCompiler';
import { MaterialCompiler } from '../material/MaterialCompiler';
import { ModelCompiler } from '../model/ModelCompiler';
import { RendererCompiler } from '../render/RendererCompiler';
import { SceneCompiler } from '../scene/SceneCompiler';
import { TextureCompiler } from '../texture/TextureCompiler';
import { DataSupportManager } from '../../manager/DataSupportManager';
import { CompilerManager } from '../../manager/CompilerManager';
import { SpriteCompiler } from '../sprite/SpriteCompiler';
// 插件处理集合
let pluginHandler = new Map();
pluginHandler.set('WebGLRenderer', WebGLRendererSupportPlugin);
pluginHandler.set('Scene', SceneSupportPlugin);
pluginHandler.set('ModelingScene', ModelingSceneSupportPlugin);
pluginHandler.set('RenderManager', RendererManagerPlugin);
pluginHandler.set('Stats', StatsPlugin);
pluginHandler.set('EffectComposer', EffectComposerPlugin);
pluginHandler.set('PointerManager', PointerManagerPlugin);
pluginHandler.set('EventManager', EventManagerSupportPlugin);
pluginHandler.set('OrbitControls', OrbitControlsSupportPlugin);
pluginHandler.set('TransformControls', TransformControlsSupportPlugin);
export class EngineSupport extends Engine {
    static pluginHandler = pluginHandler;
    dataSupportManager = new DataSupportManager();
    resourceManager = new ResourceManager();
    loaderManager = new LoaderManager();
    constructor(parameters) {
        super();
        if (parameters && parameters.dataSupportManager) {
            this.dataSupportManager = parameters.dataSupportManager;
        }
        this.loaderManager.addEventListener('loaded', event => {
            this.resourceManager.mappingResource(event.resourceMap);
        });
    }
    // 注入无需loader的外部资源例如scirpt生成的资源
    mappingResource(resourceMap) {
        const map = new Map();
        Object.keys(resourceMap).forEach(key => {
            map.set(key, resourceMap[key]);
        });
        this.resourceManager.mappingResource(map);
        return this;
    }
    // load 生命周期
    load(config, callback) {
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
    // 安装完插件之后开始进行支持
    support() {
        // 需要最基本的插件支持
        if (!this.webGLRenderer) {
            console.warn(`support exec must after installed webGLRenderer`);
            return this;
        }
        if (!this.scene) {
            console.warn(`support exec must after installed some scene`);
            return this;
        }
        if (!this.renderManager) {
            console.warn(`support exec must after installed renderManager`);
            return this;
        }
        const dataSupportManager = this.dataSupportManager;
        const textureDataSupport = dataSupportManager.getDataSupport(MODULETYPE.TEXTURE);
        const materialDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MATERIAL);
        const cameraDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CAMERA);
        const lightDataSupport = dataSupportManager.getDataSupport(MODULETYPE.LIGHT);
        const geometryDataSupport = dataSupportManager.getDataSupport(MODULETYPE.GEOMETRY);
        const modelDataSupport = dataSupportManager.getDataSupport(MODULETYPE.MODEL);
        const rendererDataSupport = dataSupportManager.getDataSupport(MODULETYPE.RENDERER);
        const sceneDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SCENE);
        const controlsDataSupport = dataSupportManager.getDataSupport(MODULETYPE.CONTROLS);
        const spriteDataSupport = dataSupportManager.getDataSupport(MODULETYPE.SPRITE);
        const textureCompiler = new TextureCompiler({
            target: textureDataSupport.getData()
        });
        const materialCompiler = new MaterialCompiler({
            target: materialDataSupport.getData()
        });
        const cameraCompiler = new CameraCompiler({
            target: cameraDataSupport.getData(),
            scene: this.scene,
            engine: this
        });
        const lightCompiler = new LightCompiler({
            scene: this.scene,
            target: lightDataSupport.getData()
        });
        const geometryCompiler = new GeometryCompiler({
            target: geometryDataSupport.getData()
        });
        const modelCompiler = new ModelCompiler({
            scene: this.scene,
            target: modelDataSupport.getData()
        });
        const rendererCompiler = new RendererCompiler({
            target: rendererDataSupport.getData(),
            engine: this
        });
        const sceneCompiler = new SceneCompiler({
            target: sceneDataSupport.getData(),
            scene: this.scene
        });
        const controlsCompiler = new ControlsCompiler({
            target: controlsDataSupport.getData(),
            transformControls: this.transformControls
        });
        const spriteCompiler = new SpriteCompiler({
            target: spriteDataSupport.getData(),
            scene: this.scene
        });
        const resourceManager = this.resourceManager;
        // 建立编译器链接
        sceneCompiler.linkTextureMap(textureCompiler.getMap());
        materialCompiler.linkTextureMap(textureCompiler.getMap());
        modelCompiler
            .linkGeometryMap(geometryCompiler.getMap())
            .linkMaterialMap(materialCompiler.getMap())
            .linkObjectMap(lightCompiler.getMap())
            .linkObjectMap(cameraCompiler.getMap())
            .linkObjectMap(modelCompiler.getMap())
            .linkObjectMap(spriteCompiler.getMap());
        cameraCompiler
            .linkObjectMap(lightCompiler.getMap())
            .linkObjectMap(cameraCompiler.getMap())
            .linkObjectMap(modelCompiler.getMap())
            .linkObjectMap(spriteCompiler.getMap());
        spriteCompiler.linkMaterialMap(materialCompiler.getMap());
        textureCompiler.linkRescourceMap(resourceManager.resourceMap);
        geometryCompiler.linkRescourceMap(resourceManager.resourceMap);
        // 添加通知
        textureDataSupport.addCompiler(textureCompiler);
        materialDataSupport.addCompiler(materialCompiler);
        cameraDataSupport.addCompiler(cameraCompiler);
        lightDataSupport.addCompiler(lightCompiler);
        geometryDataSupport.addCompiler(geometryCompiler);
        modelDataSupport.addCompiler(modelCompiler);
        rendererDataSupport.addCompiler(rendererCompiler);
        sceneDataSupport.addCompiler(sceneCompiler);
        controlsDataSupport.addCompiler(controlsCompiler);
        spriteDataSupport.addCompiler(spriteCompiler);
        this.compilerManager = new CompilerManager({
            textureCompiler,
            materialCompiler,
            cameraCompiler,
            lightCompiler,
            geometryCompiler,
            modelCompiler,
            rendererCompiler,
            sceneCompiler,
            controlsCompiler,
            spriteCompiler
        });
        return this;
    }
    // 重载
    install(plugin, params) {
        if (EngineSupport.pluginHandler.has(plugin)) {
            EngineSupport.pluginHandler.get(plugin).call(this, params);
        }
        else {
            console.error(`EngineSupport can not support ${plugin} plugin.`);
        }
        return this;
    }
}
//# sourceMappingURL=EngineSupport.js.map