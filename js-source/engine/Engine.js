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
    stats;
    transing;
    setSize;
    setCamera;
    setDom;
    setStats;
    setTransformControls;
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
    // 安装
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