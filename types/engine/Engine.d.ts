import { Camera, Scene, WebGLRenderer, WebGLRendererParameters } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { ModelingScene, ModelingSceneParameters } from "../extends/ModelingScene/ModelingScene";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { SceneParameters } from "../plugins/ScenePlugin";
import { RenderManager } from "../manager/RenderManager";
import { VisStatsParameters } from "../optimize/VisStats";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposerParameters } from "../plugins/EffectComposerPlugin";
import { PointerManager } from "../manager/PointerManager";
import { PointerManagerParameters } from "../manager/PointerManager";
import { EventManager, EventManagerParameters } from "../manager/EventManager";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { LoaderManager, LoaderManagerParameters } from "../manager/LoaderManager";
import { ResourceManager } from "../manager/ResourceManager";
import { DataSupportManager, DataSupportManagerParameters } from "../manager/DataSupportManager";
import { CompilerManager, CompilerManagerParameters } from "../manager/CompilerManager";
export declare enum ENGINEPLUGIN {
    WEBGLRENDERER = "WebGLRenderer",
    SCENE = "Scene",
    MODELINGSCENE = "ModelingScene",
    RENDERMANAGER = "RenderManager",
    ORBITCONTROLS = "OrbitControls",
    STATS = "Stats",
    EFFECTCOMPOSER = "EffectComposer",
    POINTERMANAGER = "PointerManager",
    EVENTMANAGER = "EventManager",
    TRANSFORMCONTROLS = "TransformControls",
    LOADERMANAGER = "LoaderManager",
    RESOURCEMANAGER = "ResourceManager",
    DATASUPPORTMANAGER = "DataSupportManager",
    COMPILERMANAGER = "CompilerManager"
}
export declare type EnginePluginParams = WebGLRendererParameters | SceneParameters | ModelingSceneParameters | VisStatsParameters | EffectComposerParameters | PointerManagerParameters | EventManagerParameters | LoaderManagerParameters | DataSupportManagerParameters | CompilerManagerParameters;
export declare class Engine extends EventDispatcher {
    static pluginHandler: Map<string, Function> | undefined;
    static register: (name: string, handler: (this: Engine, params?: Object | undefined) => void) => void;
    static dispose: () => void;
    completeSet: Set<(engine: Engine) => void>;
    dom?: HTMLElement;
    webGLRenderer?: WebGLRenderer;
    currentCamera?: Camera;
    scene?: Scene | ModelingScene;
    orbitControls?: OrbitControls;
    transformControls?: TransformControls;
    effectComposer?: EffectComposer;
    renderManager?: RenderManager;
    pointerManager?: PointerManager;
    eventManager?: EventManager;
    loaderManager?: LoaderManager;
    resourceManager?: ResourceManager;
    dataSupportManager?: DataSupportManager;
    compilerManager?: CompilerManager;
    stats?: Stats;
    transing?: boolean;
    setSize?: (width: number, height: number) => this;
    setCamera?: (camera: Camera) => this;
    setDom?: (dom: HTMLElement) => this;
    setStats?: (show: boolean) => this;
    setTransformControls?: (show: boolean) => this;
    loadResources?: (urlList: Array<string>) => this;
    registerResources?: (resourceMap: {
        [key: string]: unknown;
    }) => this;
    toJSON?: () => string;
    play?: () => this;
    stop?: () => this;
    render?: () => this;
    constructor();
    protected optimizeMemory(): void;
    install(plugin: ENGINEPLUGIN, params?: EnginePluginParams): this;
    complete(): this;
    dispose(): this;
}
