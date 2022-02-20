import { EventDispatcher } from "../core/EventDispatcher";
import { ModelingScenePlugin } from "../plugins/ModelingScenePlugin";
import { ScenePlugin } from "../plugins/ScenePlugin";
import { RendererManagerPlugin } from "../plugins/RenderManagerPlugin";
import { OrbitControlsPlugin } from "../plugins/OrbitControlsPlugin";
import { StatsPlugin } from "../plugins/StatsPlugin";
import { EffectComposerPlugin } from "../plugins/EffectComposerPlugin";
import { PointerManagerPlugin } from "../plugins/PointerManagerPlugin";
import { EventManagerPlugin } from "../plugins/EventManagerPlugin";
import { TransformControlsPlugin } from "../plugins/TransformControlsPlugin";
import { WebGLRendererPlugin } from "../plugins/WebGLRendererPlugin";
import { LoaderManagerPlugin } from "../plugins/LoaderManagerPlugin";
import { ResourceManagerPlugin } from "../plugins/ResourceManagerPlugin";
import { DataSupportManagerPlugin } from "../plugins/DataSupportManagerPlugin";
import { CompilerManagerPlugin } from "../plugins/CompilerManagerPlugin";
// 存在的插件接口
export var EnginePlugin;
(function (EnginePlugin) {
    EnginePlugin["WEBGLRENDERER"] = "WebGLRenderer";
    EnginePlugin["SCENE"] = "Scene";
    EnginePlugin["MODELINGSCENE"] = "ModelingScene";
    EnginePlugin["RENDERMANAGER"] = "RenderManager";
    EnginePlugin["ORBITCONTROLS"] = "OrbitControls";
    EnginePlugin["STATS"] = "Stats";
    EnginePlugin["EFFECTCOMPOSER"] = "EffectComposer";
    EnginePlugin["POINTERMANAGER"] = "PointerManager";
    EnginePlugin["EVENTMANAGER"] = "EventManager";
    EnginePlugin["TRANSFORMCONTROLS"] = "TransformControls";
    EnginePlugin["LOADERMANAGER"] = "LoaderManager";
    EnginePlugin["RESOURCEMANAGER"] = "ResourceManager";
    EnginePlugin["DATASUPPORTMANAGER"] = "DataSupportManager";
    EnginePlugin["COMPILERMANAGER"] = "CompilerManager";
})(EnginePlugin || (EnginePlugin = {}));
// 插件处理集合
let pluginHandler = new Map();
pluginHandler.set('WebGLRenderer', WebGLRendererPlugin);
pluginHandler.set('Scene', ScenePlugin);
pluginHandler.set('ModelingScene', ModelingScenePlugin);
pluginHandler.set('RenderManager', RendererManagerPlugin);
pluginHandler.set('OrbitControls', OrbitControlsPlugin);
pluginHandler.set('Stats', StatsPlugin);
pluginHandler.set('EffectComposer', EffectComposerPlugin);
pluginHandler.set('PointerManager', PointerManagerPlugin);
pluginHandler.set('EventManager', EventManagerPlugin);
pluginHandler.set('TransformControls', TransformControlsPlugin);
pluginHandler.set('LoaderManager', LoaderManagerPlugin);
pluginHandler.set('ResourceManager', ResourceManagerPlugin);
pluginHandler.set('DataSupportManager', DataSupportManagerPlugin);
pluginHandler.set('CompilerManager', CompilerManagerPlugin);
// 引擎槽
export class Engine extends EventDispatcher {
    static pluginHandler = pluginHandler;
    // 注册
    static register = function (name, handler) {
        Engine.pluginHandler && Engine.pluginHandler.set(name, handler);
    };
    // 清空缓存
    static dispose = function () {
        Engine.pluginHandler = undefined;
    };
    completeSet;
    dom;
    webGLRenderer;
    currentCamera;
    scene;
    orbitControls;
    transformControls;
    effectComposer;
    renderManager;
    pointerManager;
    eventManager;
    loaderManager;
    resourceManager;
    dataSupportManager;
    compilerManager;
    stats;
    transing;
    setSize;
    setCamera;
    setDom;
    setStats;
    setTransformControls;
    loadResources;
    registerResources;
    play;
    stop;
    render;
    constructor() {
        super();
        this.completeSet = new Set();
        this.render = function () {
            console.warn('can not install some plugin');
            return this;
        };
        this.optimizeMemory();
    }
    optimizeMemory() {
        Object.keys(this).forEach(key => {
            if (this[key] === undefined) {
                delete this[key];
            }
        });
    }
    // 安装插件
    install(plugin, params) {
        if (Engine.pluginHandler.has(plugin)) {
            Engine.pluginHandler.get(plugin).call(this, params);
        }
        else {
            console.error(`engine can not support ${plugin} plugin.`);
        }
        return this;
    }
    // 完成
    complete() {
        this.completeSet.forEach(fun => {
            fun(this);
        });
        this.completeSet = undefined;
        return this;
    }
    // 清除缓存
    dispose() {
        this.dispatchEvent({
            type: 'dispose'
        });
        return this;
    }
}
//# sourceMappingURL=Engine.js.map