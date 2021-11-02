import { WebGLRenderer, EventDispatcher, WebGL1Renderer, BaseEvent } from 'three';
import { VisCamera } from '../visObject/visCamera/VisCamera';
import { VisScene } from './VisScene';
export interface VisEngineParameters {
    renderer: WebGLRenderer | WebGL1Renderer;
    scene: VisScene;
    camera: VisCamera;
}
export interface VisEngineSetCameraEvent extends BaseEvent {
    camera: VisCamera;
}
export interface VisEngineSetSizeEvent extends BaseEvent {
    width: number;
    height: number;
}
export declare type VisRenderFun = (delta: number, total: number) => void;
export declare class VisEngine extends EventDispatcher<VisEngineSetCameraEvent | VisEngineSetSizeEvent> {
    private static clock;
    private static renderSet;
    private static animationFrame;
    static addRenderFun: (fun: VisRenderFun) => void;
    static removeRenderFun: (fun: VisRenderFun) => void;
    static updateRender: () => void;
    static stopRender: () => void;
    static hasVisRenderFun: (fun: VisRenderFun) => boolean;
    static checkHasRendering: () => boolean;
    static hasVaildRender: () => boolean;
    private renderer;
    private scene;
    private camera;
    private renderFun;
    constructor(parameters: VisEngineParameters);
    getRenderCanvas(): HTMLCanvasElement;
    getRenderer(): WebGLRenderer;
    getScene(): VisScene;
    getCamera(): VisCamera;
    setCamera(camera: VisCamera): this;
    setSize(width: number, height: number): this;
    render(): void;
    stop(): void;
    dispose(): void;
}
//# sourceMappingURL=VisEngine.d.ts.map