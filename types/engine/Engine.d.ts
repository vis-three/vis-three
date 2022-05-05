import { Camera, Object3D, Scene, WebGLRenderer } from "three";
import { BaseEvent, EventDispatcher } from "../core/EventDispatcher";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderManager } from "../manager/RenderManager";
import Stats from "three/examples/jsm/libs/stats.module";
import { PointerManager } from "../manager/PointerManager";
import { EventManager } from "../manager/EventManager";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import { Screenshot } from "../plugins/WebGLRendererPlugin";
import { LoadedEvent, LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { DataSupportManager, LoadOptions } from "../manager/DataSupportManager";
import { CompilerManager } from "../manager/CompilerManager";
import { KeyboardManager } from "../manager/KeyboardManager";
import { VIEWPOINT } from "../plugins/ViewpointPlugin";
import { DISPLAYMODE } from "../plugins/DisplayModePlugin";
import { ObjectHelperManager } from "../manager/ObjectHelperManager";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { SymbolConfig } from "../middleware/common/CommonConfig";
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
export interface SetDomEvent extends BaseEvent {
    type: "setDom";
    dom: HTMLElement;
}
export interface SetCameraEvent extends BaseEvent {
    type: "setCamera";
    camera: Camera;
}
export interface SetSceneEvent extends BaseEvent {
    type: "setScene";
    scene: Scene;
}
export interface SetSizeEvent extends BaseEvent {
    type: "setSize";
    width: number;
    height: number;
}
export declare class Engine extends EventDispatcher {
    static pluginHandler: Map<string, Function> | undefined;
    static register: <T extends object>(name: string, handler: (this: Engine, params: T) => void) => typeof Engine;
    static dispose: () => void;
    completeSet: Set<(engine: Engine) => void>;
    camera: Camera;
    scene: Scene;
    IS_ENGINESUPPORT: boolean;
    dom?: HTMLElement;
    webGLRenderer?: WebGLRenderer;
    orbitControls?: VisOrbitControls;
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
    objectHelperManager?: ObjectHelperManager;
    stats?: Stats;
    displayMode?: DISPLAYMODE;
    selectionBox?: Set<Object3D>;
    getScreenshot?: (params: Screenshot) => HTMLImageElement;
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
    loadResources?: (urlList: Array<string>, callback: (err: Error | undefined, event?: LoadedEvent | MappedEvent) => void) => this;
    loadResourcesAsync?: (urlList: Array<string>) => Promise<LoadedEvent | MappedEvent>;
    registerResources?: (resourceMap: {
        [key: string]: unknown;
    }) => this;
    toJSON?: () => string;
    exportConfig?: (compress: boolean) => LoadOptions;
    applyConfig?: <T extends SymbolConfig>(...configs: T[]) => this;
    reactiveConfig?: <T extends SymbolConfig>(config: T) => T;
    getConfigBySymbol?: <T extends SymbolConfig>(vid: string) => T | null;
    removeConfigBySymbol?: (vid: string) => this;
    getObjectSymbol?: <O extends Object3D>(object: O) => SymbolConfig["vid"] | null;
    getObjectBySymbol?: (vid: string) => Object3D | null;
    play?: () => this;
    stop?: () => this;
    render?: () => this;
    constructor();
    /**
     * 优化内存
     */
    protected optimizeMemory(): void;
    install<T extends object>(plugin: ENGINEPLUGIN, params?: T): this;
    complete(): this;
    /**
     * 清除引擎缓存
     * @returns this
     */
    dispose(): this;
    /**
     * 设置输出的dom
     * @param dom HTMLElement
     * @returns this
     */
    setDom(dom: HTMLElement): this;
    /**
     * 设置引擎整体尺寸
     * @param width number
     * @param height number
     * @returns this
     */
    setSize(width?: number, height?: number): this;
    /**
     * 设置相机
     * @param vid 相机标识
     * @returns this
     */
    setCamera(vid: string): this;
    /**
     * 设置相机
     * @param camera 相机对象
     * @returns this
     */
    setCamera(camera: Camera): this;
    /**
     * 设置场景
     * @param vid 场景标识
     * @returns this
     */
    setScene(vid: string): this;
    /**
     * 设置场景
     * @param scene 场景对象
     * @returns this
     */
    setScene(scene: Scene): this;
}
