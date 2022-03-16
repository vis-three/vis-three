import { EventDispatcher } from "../core/EventDispatcher";
import { ModelingScenePlugin } from "../plugins/ModelingScenePlugin";
import { ScenePlugin } from "../plugins/ScenePlugin";
import { RenderManagerPlugin } from "../plugins/RenderManagerPlugin";
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
import { KeyboardManagerPlugin } from "../plugins/KeyboardManagerPlugin";
// 存在的插件接口
export var ENGINEPLUGIN;
(function (ENGINEPLUGIN) {
    ENGINEPLUGIN["WEBGLRENDERER"] = "WebGLRenderer";
    ENGINEPLUGIN["SCENE"] = "Scene";
    ENGINEPLUGIN["MODELINGSCENE"] = "ModelingScene";
    ENGINEPLUGIN["RENDERMANAGER"] = "RenderManager";
    ENGINEPLUGIN["ORBITCONTROLS"] = "OrbitControls";
    ENGINEPLUGIN["STATS"] = "Stats";
    ENGINEPLUGIN["EFFECTCOMPOSER"] = "EffectComposer";
    ENGINEPLUGIN["POINTERMANAGER"] = "PointerManager";
    ENGINEPLUGIN["EVENTMANAGER"] = "EventManager";
    ENGINEPLUGIN["TRANSFORMCONTROLS"] = "TransformControls";
    ENGINEPLUGIN["LOADERMANAGER"] = "LoaderManager";
    ENGINEPLUGIN["RESOURCEMANAGER"] = "ResourceManager";
    ENGINEPLUGIN["DATASUPPORTMANAGER"] = "DataSupportManager";
    ENGINEPLUGIN["COMPILERMANAGER"] = "CompilerManager";
    ENGINEPLUGIN["KEYBOARDMANAGER"] = "KeyboardManager";
})(ENGINEPLUGIN || (ENGINEPLUGIN = {}));
// 插件处理集合
let pluginHandler = new Map();
pluginHandler.set(ENGINEPLUGIN.WEBGLRENDERER, WebGLRendererPlugin);
pluginHandler.set(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin);
pluginHandler.set(ENGINEPLUGIN.SCENE, ScenePlugin);
pluginHandler.set(ENGINEPLUGIN.MODELINGSCENE, ModelingScenePlugin);
pluginHandler.set(ENGINEPLUGIN.RENDERMANAGER, RenderManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.POINTERMANAGER, PointerManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.EVENTMANAGER, EventManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.LOADERMANAGER, LoaderManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.RESOURCEMANAGER, ResourceManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.DATASUPPORTMANAGER, DataSupportManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.COMPILERMANAGER, CompilerManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.KEYBOARDMANAGER, KeyboardManagerPlugin);
pluginHandler.set(ENGINEPLUGIN.ORBITCONTROLS, OrbitControlsPlugin);
pluginHandler.set(ENGINEPLUGIN.TRANSFORMCONTROLS, TransformControlsPlugin);
pluginHandler.set(ENGINEPLUGIN.STATS, StatsPlugin);
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
    IS_ENGINESUPPORT = false;
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
    keyboardManager;
    stats;
    transing;
    setSize;
    setCamera;
    setDom;
    setStats;
    setTransformControls;
    loadResources;
    loadResourcesAsync;
    registerResources;
    toJSON;
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
        this.completeSet.clear();
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