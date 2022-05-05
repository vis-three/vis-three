import { Camera, PerspectiveCamera, Scene, } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { RenderManagerPlugin } from "../plugins/RenderManagerPlugin";
import { OrbitControlsPlugin } from "../plugins/OrbitControlsPlugin";
import { StatsPlugin } from "../plugins/StatsPlugin";
import { EffectComposerPlugin, } from "../plugins/EffectComposerPlugin";
import { PointerManagerPlugin } from "../plugins/PointerManagerPlugin";
import { EventManagerPlugin } from "../plugins/EventManagerPlugin";
import { TransformControlsPlugin } from "../plugins/TransformControlsPlugin";
import { WebGLRendererPlugin, } from "../plugins/WebGLRendererPlugin";
import { LoaderManagerPlugin } from "../plugins/LoaderManagerPlugin";
import { ResourceManagerPlugin } from "../plugins/ResourceManagerPlugin";
import { DataSupportManagerPlugin } from "../plugins/DataSupportManagerPlugin";
import { CompilerManagerPlugin } from "../plugins/CompilerManagerPlugin";
import { KeyboardManagerPlugin } from "../plugins/KeyboardManagerPlugin";
import { ViewpointPlugin, } from "../plugins/ViewpointPlugin";
import { AxesHelperPlugin, } from "../plugins/AxesHelperPlugin";
import { GridHelperPlugin, } from "../plugins/GridHelperPlugin";
import { DisplayModelPlugin, } from "../plugins/DisplayModePlugin";
import { ObjectHelperPlugin, } from "../plugins/ObjectHelperPlugin";
import { SelectionPlugin, } from "../plugins/SelectionPlugin";
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
    camera = new PerspectiveCamera();
    scene = new Scene();
    IS_ENGINESUPPORT = false;
    dom;
    webGLRenderer;
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
    objectHelperManager;
    stats;
    displayMode;
    selectionBox;
    getScreenshot;
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
    exportConfig;
    applyConfig;
    reactiveConfig;
    getConfigBySymbol;
    removeConfigBySymbol;
    getObjectSymbol;
    getObjectBySymbol;
    play;
    stop;
    render;
    constructor() {
        super();
        this.completeSet = new Set();
        this.render = function () {
            console.warn("can not install some plugin");
            return this;
        };
        this.camera.position.set(50, 50, 50);
        this.addEventListener("setSize", (event) => {
            this.camera.aspect = event.width / event.height;
            this.camera.updateProjectionMatrix();
        });
    }
    /**
     * 优化内存
     */
    optimizeMemory() {
        Object.keys(this).forEach((key) => {
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
        this.completeSet.forEach((fun) => {
            fun(this);
        });
        this.completeSet.clear();
        return this;
    }
    /**
     * 清除引擎缓存
     * @returns this
     */
    dispose() {
        this.dispatchEvent({
            type: "dispose",
        });
        return this;
    }
    /**
     * 设置输出的dom
     * @param dom HTMLElement
     * @returns this
     */
    setDom(dom) {
        this.dom = dom;
        this.dispatchEvent({
            type: "setDom",
            dom: dom,
        });
        return this;
    }
    /**
     * 设置引擎整体尺寸
     * @param width number
     * @param height number
     * @returns this
     */
    setSize(width, height) {
        if ((width && width <= 0) || (height && height <= 0)) {
            console.warn(`you must be input width and height bigger then zero, width: ${width}, height: ${height}`);
            return this;
        }
        !width && (width = this.dom?.offsetWidth || window.innerWidth);
        !height && (height = this.dom?.offsetHeight || window.innerHeight);
        this.dispatchEvent({ type: "setSize", width, height });
        return this;
    }
    setCamera(camera) {
        if (typeof camera === "object" && camera instanceof Camera) {
            this.camera = camera;
            this.dispatchEvent({
                type: "setCamera",
                camera,
            });
        }
        else {
            if (this.IS_ENGINESUPPORT) {
                const target = this.compilerManager.getObjectBySymbol(camera);
                if (target) {
                    this.camera = target;
                    this.dispatchEvent({
                        type: "setCamera",
                        camera: target,
                    });
                }
                else {
                    console.warn(`can not found camera in compilerManager: ${camera}`);
                }
            }
            else {
                console.warn(`engine is not a Engine support but use symbol to found camera.`);
            }
        }
        return this;
    }
    setScene(scene) {
        if (typeof scene === "object" && scene instanceof Scene) {
            this.scene = scene;
            this.dispatchEvent({
                type: "setScene",
                scene,
            });
        }
        else {
            if (this.IS_ENGINESUPPORT) {
                const target = this.compilerManager.getObjectBySymbol(scene);
                if (target) {
                    this.scene = target;
                    this.dispatchEvent({
                        type: "setScene",
                        scene: target,
                    });
                }
                else {
                    console.warn(`can not found camera in compilerManager: ${scene}`);
                }
            }
            else {
                console.warn(`engine is not a Engine support but use symbol to found camera.`);
            }
        }
        return this;
    }
}
Engine.register(ENGINEPLUGIN.WEBGLRENDERER, WebGLRendererPlugin);
Engine.register(ENGINEPLUGIN.EFFECTCOMPOSER, EffectComposerPlugin);
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