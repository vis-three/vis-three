import { Camera, EventDispatcher, Vector3 } from "three";
export declare enum MOUSE_BUTTON {
    LEFT = 0,
    MID = 1,
    RIGHT = 2
}
export declare class PointerVisualControls extends EventDispatcher {
    domElement: HTMLElement;
    camera: Camera;
    minPolarAngle: number;
    maxPolarAngle: number;
    pointerSpeed: number;
    pointerButton: MOUSE_BUTTON;
    private isLocked;
    private direction;
    private _mouseMove;
    private _mouseDown;
    private _mouseUp;
    constructor(camera: Camera, domElement: HTMLElement);
    setDom(dom: HTMLElement): void;
    setCamera(camera: Camera): void;
    getDirection(v: Vector3): Vector3;
    onMouseDown(event: MouseEvent): void;
    onMouseUp(event: MouseEvent): void;
    onMouseMove(event: MouseEvent): void;
    connect(): void;
    dispose(): void;
    getObject(): Camera;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
}
