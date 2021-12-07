import { Camera, Scene, WebGLRenderer, Object3D, EventDispatcher, BaseEvent } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { PointerManager } from "../../plugins/PointerManager";
import { SceneStatusManager } from "../../plugins/SceneStatusManager";
import { VisStats } from "../../optimize/VisStats";
import { VisOrbitControls } from "../../optimize/VisOrbitControls";
import { VisTransformControls } from "../../optimize/VisTransformControls";
import { RenderManager } from "../../manager/RenderManager";
export interface SetCameraEvent extends BaseEvent {
    camera: Camera;
}
export interface SetSizeEvent extends BaseEvent {
    width: number;
    height: number;
}
export declare class ModelingEngine extends EventDispatcher<SetCameraEvent | SetSizeEvent> {
    protected stats: VisStats;
    protected orbitControls: VisOrbitControls;
    protected transformControls: VisTransformControls;
    protected pointerManager: PointerManager;
    protected sceneStatusManager: SceneStatusManager;
    protected composer: EffectComposer;
    protected renderer: WebGLRenderer;
    protected scene: Scene;
    protected renderManager: RenderManager;
    protected hoverObjectSet: Set<Object3D>;
    protected activeObjectSet: Set<Object3D>;
    constructor(dom?: HTMLElement);
    getRenderer(): WebGLRenderer;
    getScene(): Scene;
    setCamera(camera: Camera): this;
    setSize(width: number, height: number): this;
    render(): void;
    play(): void;
    stop(): void;
    addRender(): this;
    dispose(): void;
}
