import { Path3Config, PathConfig } from "@vis-three/module-path";
import { BaseEvent, LineBasicMaterial, Object3D, OrthographicCamera, PerspectiveCamera, PointsMaterial, Raycaster } from "three";
import { PointerManager } from "@vis-three/plugin-pointer-manager";
export declare enum PATHSUPPORTCONTROLS_EVENT {
    MOUSEDOWN = "mousedown",
    CHANGING = "changing",
    MOUSEUP = "mouseup",
    CLICK = "click"
}
export interface ContolsEvent extends BaseEvent {
    index: number;
    config: PathConfig;
    last: boolean;
    object: Object3D;
    operate: "anchor" | "move";
}
export declare class PathSupportControls extends Object3D<ContolsEvent> {
    static anchorMaterial: PointsMaterial;
    static moveMaterial: PointsMaterial;
    static moveHelperMaterial: LineBasicMaterial;
    dragging: boolean;
    raycaster: Raycaster;
    private anchorGizmo;
    private moveGizmo;
    private moveHelper;
    private plane;
    private pointerManager;
    private cachePlaneVector3;
    private cacheQuaternion;
    private cacheNormal;
    private cachePosition;
    private cacheMouseDownPoistion;
    private cacheMouseMoveDirection;
    private cacheConfigIndex;
    private moveCurveIndexMap;
    private helperRangeMap;
    private currentGuizmo?;
    private currentIndex;
    private domElement;
    private camera;
    private config;
    private object;
    private cacheObjectInvert;
    private pathType;
    private _pointerHover;
    private _pointerMove;
    private _pointerDown;
    private _pointerUp;
    constructor(camera: PerspectiveCamera | OrthographicCamera, dom: HTMLElement, object?: Object3D, config?: PathConfig | Path3Config);
    setDom(dom: HTMLElement): this;
    setCamera(camera: PerspectiveCamera | OrthographicCamera): this;
    setObject(object: Object3D): this;
    setConfig(config: PathConfig | Path3Config): this;
    update(): void;
    private updateHelper;
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
