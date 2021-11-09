import { Camera, Scene, WebGLRenderer, EventDispatcher, BaseEvent } from "three";
export interface SetCameraEvent extends BaseEvent {
    camera: Camera;
}
export interface SetSizeEvent extends BaseEvent {
    width: number;
    height: number;
}
export declare class ModelingEngine extends EventDispatcher<SetCameraEvent | SetSizeEvent> {
    private stats;
    private orbitControls;
    private transformControls;
    private pointerManager;
    private sceneStatusManager;
    private composer;
    private renderer;
    private scene;
    private renderManager;
    private hoverObjectSet;
    private activeObjectSet;
    constructor(dom?: HTMLElement);
    getRenderer(): WebGLRenderer;
    getScene(): Scene;
    setCamera(camera: Camera): this;
    setSize(width: number, height: number): this;
    render(): void;
    stop(): void;
    addRender(): this;
    dispose(): void;
}
