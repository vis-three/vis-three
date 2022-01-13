import { Camera, WebGLRenderer, EventDispatcher, BaseEvent } from "three";
import { ModelingScene } from "./ModelingScene";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { PointerManager } from "../../plugins/PointerManager";
import { SceneStatusManager } from "../../plugins/SceneStatusManager";
import { VisStats } from "../../optimize/VisStats";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { VisTransformControls } from "../../optimize/VisTransformControls";
import { RenderManager } from "../../manager/RenderManager";
export declare enum MODELINGENGINEEVNET {
    SETCAMERA = "setCamera",
    SETSIZE = "setSize"
}
export interface SetCameraEvent extends BaseEvent {
    camera: Camera;
}
export interface SetSizeEvent extends BaseEvent {
    width: number;
    height: number;
}
export declare class ModelingEngine extends EventDispatcher {
    protected stats: VisStats;
    protected orbitControls: VisOrbitControls;
    protected transformControls: VisTransformControls;
    protected pointerManager: PointerManager;
    protected sceneStatusManager: SceneStatusManager;
    protected composer: EffectComposer;
    protected renderer: WebGLRenderer;
    protected scene: ModelingScene;
    protected renderManager: RenderManager;
    private transing;
    private currentCamera;
    constructor(dom?: HTMLElement);
    showTransformControls(visiable: boolean): this;
    showStats(visiable: boolean): this;
    getSceneStatusManager(): SceneStatusManager;
    getTransformControls(): VisTransformControls;
    getRenderer(): WebGLRenderer;
    getScene(): ModelingScene;
    getCurrentCamera(): Camera;
    getRenderManager(): RenderManager;
    getPointerManager(): PointerManager;
    setCamera(camera: Camera): this;
    setSize(width: number, height: number): this;
    render(): void;
    play(): void;
    stop(): void;
    addRender(): this;
    dispose(): void;
}
