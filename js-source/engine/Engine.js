import { EventDispatcher } from "../core/EventDispatcher";
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
import { ViewpointPlugin } from "../plugins/ViewpointPlugin";
import { AxesHelperPlugin } from "../plugins/AxesHelperPlugin";
import { GridHelperPlugin } from "../plugins/GridHelperPlugin";
import { DisplayModelPlugin } from "../plugins/DisplayModePlugin";
import { ObjectHelperPlugin } from "../plugins/ObjectHelperPlugin";
import { SelectionPlugin } from "../plugins/SelectionPlugin";
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
    ENGINEPLUGIN["AXESHELPER"] = "AxesHelper";
    ENGINEPLUGIN["GRIDHELPER"] = "GridHelper";
    ENGINEPLUGIN["VIEWPOINT"] = "Viewpoint";
    ENGINEPLUGIN["DISPLAYMODE"] = "DisplayMode";
    ENGINEPLUGIN["OBJECTHELPER"] = "ObjectHelper";
    ENGINEPLUGIN["SELECTION"] = "Selection";
})(ENGINEPLUGIN || (ENGINEPLUGIN = {}));
// 引擎槽
export class Engine extends EventDispatcher {
    static pluginHandler = new Map();
    // 注册引擎插件
    static register = function (name, handler) {
        Engine.pluginHandler && Engine.pluginHandler.set(name, handler);
        return Engine;
    };
    // 清空插件缓存
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
    displayMode;
    selectionBox;
    getScreenshot;
    setSize;
    setCamera;
    setDom;
    setStats;
    setTransformControls;
    setViewpoint;
    setDisplayMode;
    setAxesHelper;
    setGridHelper;
    setObjectHelper;
    setSelectionBox;
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
Engine.register(ENGINEPLUGIN.WEBGLRENDERER, WebGLRendererPlugin);
Engine.register(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin);
Engine.register(ENGINEPLUGIN.SCENE, ScenePlugin);
Engine.register(ENGINEPLUGIN.RENDERMANAGER, RenderManagerPlugin);
Engine.register(ENGINEPLUGIN.POINTERMANAGER, PointerManagerPlugin);
Engine.register(ENGINEPLUGIN.EVENTMANAGER, EventManagerPlugin);
Engine.register(ENGINEPLUGIN.LOADERMANAGER, LoaderManagerPlugin);
Engine.register(ENGINEPLUGIN.RESOURCEMANAGER, ResourceManagerPlugin);
Engine.register(ENGINEPLUGIN.DATASUPPORTMANAGER, DataSupportManagerPlugin);
Engine.register(ENGINEPLUGIN.COMPILERMANAGER, CompilerManagerPlugin);
Engine.register(ENGINEPLUGIN.KEYBOARDMANAGER, KeyboardManagerPlugin);
Engine.register(ENGINEPLUGIN.ORBITCONTROLS, OrbitControlsPlugin);
Engine.register(ENGINEPLUGIN.TRANSFORMCONTROLS, TransformControlsPlugin);
Engine.register(ENGINEPLUGIN.AXESHELPER, AxesHelperPlugin);
Engine.register(ENGINEPLUGIN.GRIDHELPER, GridHelperPlugin);
Engine.register(ENGINEPLUGIN.OBJECTHELPER, ObjectHelperPlugin);
Engine.register(ENGINEPLUGIN.DISPLAYMODE, DisplayModelPlugin);
Engine.register(ENGINEPLUGIN.VIEWPOINT, ViewpointPlugin);
Engine.register(ENGINEPLUGIN.STATS, StatsPlugin);
Engine.register(ENGINEPLUGIN.SELECTION, SelectionPlugin);
//# sourceMappingURL=Engine.js.map