import { Camera, Object3D, Scene, WebGLRenderer } from "three";
import { EventDispatcher } from "../core/EventDispatcher";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RenderManager } from "../manager/RenderManager";
import Stats from "three/examples/jsm/libs/stats.module";
import { PointerManager } from "../manager/PointerManager";
import { EventManager } from "../manager/EventManager";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Screenshot } from "../plugins/WebGLRendererPlugin";
import { LoadedEvent, LoaderManager } from "../manager/LoaderManager";
import { ResourceManager } from "../manager/ResourceManager";
import { DataSupportManager } from "../manager/DataSupportManager";
import { CompilerManager } from "../manager/CompilerManager";
import { KeyboardManager } from "../manager/KeyboardManager";
import { VIEWPOINT } from "../plugins/ViewpointPlugin";
import { DISPLAYMODE } from "../plugins/DisplayModePlugin";
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
    COMPILERMANAGER = "CompilerManager",
    KEYBOARDMANAGER = "KeyboardManager",
    AXESHELPER = "AxesHelper",
    GRIDHELPER = "GridHelper",
    VIEWPOINT = "Viewpoint",
    DISPLAYMODE = "DisplayMode",
    OBJECTHELPER = "ObjectHelper",
    SELECTION = "Selection"
}
export declare class Engine extends EventDispatcher {
    static pluginHandler: Map<string, Function> | undefined;
    static register: <T extends object>(name: string, handler: (this: Engine, params: T) => void) => typeof Engine;
    static dispose: () => void;
    completeSet: Set<(engine: Engine) => void>;
    IS_ENGINESUPPORT: boolean;
    dom?: HTMLElement;
    webGLRenderer?: WebGLRenderer;
    currentCamera?: Camera;
    scene?: Scene;
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
    keyboardManager?: KeyboardManager;
    stats?: Stats;
    transing?: boolean;
    displayMode?: DISPLAYMODE;
    selectionBox?: Set<Object3D>;
    getScreenshot?: (params: Screenshot) => HTMLImageElement;
    setSize?: (width: number, height: number) => this;
    setCamera?: (camera: Camera) => this;
    setDom?: (dom: HTMLElement) => this;
    setStats?: (show: boolean) => this;
    setTransformControls?: (show: boolean) => this;
    setViewpoint?: (viewpoint: VIEWPOINT) => this;
    setDisplayMode?: (mode: DISPLAYMODE) => this;
    setAxesHelper?: (params: {
        show: boolean;
    }) => this;
    setGridHelper?: (params: {
        show: boolean;
    }) => this;
    setObjectHelper?: (params: {
        show: boolean;
    }) => this;
    setSelectionBox?: (params: {
        objects: Object3D[];
    }) => this;
    loadResources?: (urlList: Array<string>, callback: (err: Error | undefined, event?: LoadedEvent) => void) => this;
    loadResourcesAsync?: (urlList: Array<string>) => Promise<LoadedEvent>;
    registerResources?: (resourceMap: {
        [key: string]: unknown;
    }) => this;
    toJSON?: () => string;
    play?: () => this;
    stop?: () => this;
    render?: () => this;
    constructor();
    protected optimizeMemory(): void;
    install<T extends object>(plugin: ENGINEPLUGIN, params?: T): this;
    complete(): this;
    dispose(): this;
}
