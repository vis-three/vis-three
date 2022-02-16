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
export declare enum EnginePlugin {
    WEBGLRENDERER = "WebGLRenderer",
    SCENE = "Scene",
    MODELINGSCENE = "ModelingScene",
    RENDERMANAGER = "RenderManager",
    ORBITCONTROLS = "OrbitControls",
    STATS = "Stats",
    EFFECTCOMPOSER = "EffectComposer",
    POINTERMANAGER = "PointerManager",
    EVENTMANAGER = "EventManager",
    TRANSFORMCONTROLS = "TransformControls"
}
export declare type EnginePluginParams = WebGLRendererParameters | SceneParameters | ModelingSceneParameters | VisStatsParameters | EffectComposerParameters | PointerManagerParameters | EventManagerParameters;
export declare class Engine extends EventDispatcher {
    static pluginHandler: Map<string, Function> | undefined;
    static register: (name: string, handler: (this: Engine, params?: Object | undefined) => void) => void;
    static dispose: () => void;
    completeSet?: Set<(engine: Engine) => void>;
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
    stats?: Stats;
    transing?: boolean;
    setSize?: (width: number, height: number) => this;
    setCamera?: (camera: Camera) => this;
    setDom?: (dom: HTMLElement) => this;
    setStats?: (show: boolean) => this;
    setTransformControls?: (show: boolean) => this;
    play?: () => this;
    stop?: () => this;
    render?: () => this;
    constructor();
    install(plugin: EnginePlugin, params?: EnginePluginParams): this;
    complete(): this;
    dispose(): this;
}
