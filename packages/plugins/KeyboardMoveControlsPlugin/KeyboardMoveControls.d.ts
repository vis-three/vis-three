import { Camera, Object3D } from "three";
export declare class KeyboardMoveControls {
    object: Object3D;
    domElement: HTMLElement;
    enabled: boolean;
    movementSpeed: number;
    private moveForward;
    private moveBackward;
    private moveLeft;
    private moveRight;
    private moveUp;
    private moveDown;
    private _onKeyDown;
    private _onKeyUp;
    constructor(object: Object3D, domElement: HTMLElement);
    setCamera(camera: Camera): void;
    setDom(dom: HTMLElement): void;
    onKeyDown(event: KeyboardEvent): void;
    onKeyUp(event: KeyboardEvent): void;
    update(delta: number): void;
    dispose(): void;
}
