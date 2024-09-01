import { Camera, EventDispatcher, Vector3 } from "three";
export declare class PointerLockControls extends EventDispatcher<{
    BaseEvent: any;
}> {
    domElement: HTMLElement;
    camera: Camera;
    isLocked: boolean;
    minPolarAngle: number;
    maxPolarAngle: number;
    pointerSpeed: number;
    private direction;
    private _mouseMove;
    private _pointerlockChange;
    private _pointerlockError;
    constructor(camera: Camera, domElement: HTMLElement);
    setDom(dom: HTMLElement): void;
    setCamera(camera: Camera): void;
    getDirection(v: Vector3): Vector3;
    onMouseMove(event: MouseEvent): void;
    onPointerlockChange(): void;
    onPointerlockError(): void;
    connect(): void;
    dispose(): void;
    getObject(): Camera;
    moveForward(distance: number): void;
    moveRight(distance: number): void;
    lock(): void;
    unlock(): void;
}
