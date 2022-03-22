import { Camera, Object3D, Scene, WebGLRenderer } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TransformControls } from "three/examples/jsm/controls/TransformControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { EventManager } from "../manager/EventManager";
import { KeyboardManager } from "../manager/KeyboardManager";
import { PointerManager } from "../manager/PointerManager";
import { RenderManager } from "../manager/RenderManager";
import { DISPLAYMODE } from "../plugins/DisplayModePlugin";
import { VIEWPOINT } from "../plugins/ViewpointPlugin";
import { Engine } from "./Engine";
export declare class ModelingEngine extends Engine {
    dom: HTMLElement;
    webGLRenderer: WebGLRenderer;
    currentCamera: Camera;
    scene: Scene;
    orbitControls: OrbitControls;
    transformControls: TransformControls;
    effectComposer: EffectComposer;
    renderManager: RenderManager;
    pointerManager: PointerManager;
    eventManager: EventManager;
    keyboardManager: KeyboardManager;
    stats: Stats;
    transing: boolean;
    displayMode: DISPLAYMODE;
    selectionBox: Set<Object3D>;
    setSize: (width: number, height: number) => this;
    setCamera: (camera: Camera) => this;
    setDom: (dom: HTMLElement) => this;
    setStats: (show: boolean) => this;
    setTransformControls: (show: boolean) => this;
    setViewpoint: (viewpoint: VIEWPOINT) => this;
    setDisplayMode: (mode: DISPLAYMODE) => this;
    setAxesHelper: (params: {
        show: boolean;
    }) => this;
    setGridHelper: (params: {
        show: boolean;
    }) => this;
    setObjectHelper: (params: {
        show: boolean;
    }) => this;
    play: () => this;
    stop: () => this;
    render: () => this;
    constructor();
}
