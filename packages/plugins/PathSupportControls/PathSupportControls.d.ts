import { PathConfig } from "@vis-three/module-path";
import { BaseEvent, Object3D, OrthographicCamera, PerspectiveCamera, PointsMaterial } from "three";
import { PointerManager } from "@vis-three/plugin-pointer-manager";
export declare enum PATHSUPPORTCONTROLS_EVENT {
    MOUSEDOWN = "mousedown",
    CHANGING = "changing",
    MOUSEUP = "mouseup"
}
export interface ContolsEvent extends BaseEvent {
    index: number;
    config: PathConfig;
    operate: "anchor" | "move" | "switch";
}
export declare class PathSupportControls extends Object3D<ContolsEvent> {
    static anchorMaterial: PointsMaterial;
    static moveMaterial: PointsMaterial;
    static switchMaterial: PointsMaterial;
    dragging: boolean;
    private anchorGizmo;
    private moveGizmo;
    private switchGizmo;
    private raycaster;
    private plane;
    private pointerManager;
    private cachePlaneVector3;
    private cacheQuaternion;
    private cacheNormal;
    private cachePosition;
    private cacheVertical;
    private cacheMouseDownPoistion;
    private cacheMouseMoveDirection;
    private geometryIndexFunMap;
    private anchorArcUpdateIndexs;
    private arcVecticalDirectionsMap;
    private cacheConfigIndex;
    private currentGuizmo?;
    private currentIndex;
    private domElement;
    private camera;
    private config;
    private object;
    private _pointerHover;
    private _pointerMove;
    private _pointerDown;
    private _pointerUp;
    constructor(camera: PerspectiveCamera | OrthographicCamera, dom: HTMLElement, object?: Object3D, config?: PathConfig);
    setDom(dom: HTMLElement): this;
    setCamera(camera: PerspectiveCamera | OrthographicCamera): this;
    setObject(object: Object3D): this;
    setConfig(config: PathConfig): this;
    update(): void;
    use(pointerManager: PointerManager): void;
    connect(): this;
    disconnect(): this;
    dispose(): void;
    private intersectPoint;
    private intersectPlane;
    private pointerHover;
    private pointerDown;
    private pointerMove;
    private pointerUp;
}
