import { Camera, Scene, WebGLRenderer } from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { Screenshot, WebGLRendererEngine } from "@vis-three/webgl-renderer-plugin";
import { EffectComposerEngine } from "@vis-three/effect-composer-plugin";
import { OrbitControlsEngine } from "@vis-three/orbit-controls-plugin";
import { RenderManager, RenderManagerEngine } from "@vis-three/render-manager-plugin";
import { PointerManager, PointerManagerEngine } from "@vis-three/pointer-manager-plugin";
import { EventManager, EventManagerEngine } from "@vis-three/event-manager-plugin";
import { Engine, VisOrbitControls } from "@vis-three/core";
export declare class DisplayEngine extends Engine implements WebGLRendererEngine, EffectComposerEngine, OrbitControlsEngine, RenderManagerEngine, PointerManagerEngine, EventManagerEngine {
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
    getScreenshot: (params?: Screenshot | undefined) => Promise<string>;
    constructor();
}
