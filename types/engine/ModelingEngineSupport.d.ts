import { CompilerManager } from "../manager/CompilerManager";
import { DataSupportManager } from "../manager/DataSupportManager";
import { LoaderManager } from "../manager/LoaderManager";
import { MappedEvent, ResourceManager } from "../manager/ResourceManager";
import { Engine } from "./Engine";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ModelingScene } from "../extends/ModelingScene/ModelingScene";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { Camera, WebGLRenderer } from "three";
import { EngineSupport, EngineSupportLoadOptions, EngineSupportParameters } from "./EngineSupport";
export declare class ModelingEngineSupport extends Engine implements EngineSupport {
    IS_ENGINESUPPORT: boolean;
    dom: HTMLElement;
    webGLRenderer: WebGLRenderer;
    currentCamera: Camera;
    scene: ModelingScene;
    orbitControls: OrbitControls;
    transformControls: TransformControls;
    effectComposer: EffectComposer;
    renderManager: RenderManager;
    pointerManager: PointerManager;
    eventManager: EventManager;
    stats: Stats;
    transing: boolean;
    setSize: (width: number, height: number) => this;
    setCamera: (camera: Camera) => this;
    setDom: (dom: HTMLElement) => this;
    setStats: (show: boolean) => this;
    setTransformControls: (show: boolean) => this;
    play: () => this;
    stop: () => this;
    render: () => this;
    loaderManager: LoaderManager;
    resourceManager: ResourceManager;
    dataSupportManager: DataSupportManager;
    compilerManager: CompilerManager;
    constructor(parameters?: EngineSupportParameters);
    loadConfig(config: EngineSupportLoadOptions, callback?: (event?: MappedEvent) => void): this;
}