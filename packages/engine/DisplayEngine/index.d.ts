import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { RenderManager } from "@vis-three/render-manager-plugin";
import { PointerManager } from "@vis-three/pointer-manager-plugin";
import { EventManager } from "@vis-three/event-manager-plugin";
import { Engine, VisOrbitControls } from "@vis-three/core";
export declare class DisplayEngine extends Engine {
    dom: HTMLElement;
    webGLRenderer: WebGLRenderer;
    currentCamera: Camera;
    scene: Scene;
    orbitControls: VisOrbitControls;
    effectComposer: EffectComposer;
    renderManager: RenderManager;
    pointerManager: PointerManager;
    eventManager: EventManager;
    play: () => this;
    stop: () => this;
    render: () => this;
    constructor();
}
