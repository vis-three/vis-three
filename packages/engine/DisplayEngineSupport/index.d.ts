import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { EventManager } from "../manager/EventManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { VisOrbitControls } from "../optimize/VisOrbitControls";
import { EngineSupport, EngineSupportParameters } from "../EngineSupport";
export declare class DisplayEngineSupport extends EngineSupport {
    dom: HTMLElement;
    webGLRenderer: WebGLRenderer;
    camera: Camera;
    scene: Scene;
    orbitControls: VisOrbitControls;
    effectComposer: EffectComposer;
    renderManager: RenderManager;
    pointerManager: PointerManager;
    eventManager: EventManager;
    play: () => this;
    stop: () => this;
    render: () => this;
    constructor(parameters?: EngineSupportParameters);
}
