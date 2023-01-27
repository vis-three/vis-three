import { BaseEvent, EventDispatcher } from "@vis-three/core";
import { Camera, Object3D, Vector3 } from "three";
export interface BeforeUpdateEvent extends BaseEvent {
    type: "beforeUpdate";
    delta: number;
    object: Object3D;
}
export interface AfterUpdateEvent extends BaseEvent {
    type: "afterUpdate";
    delta: number;
    object: Object3D;
}
export declare class KeyboardMoveControls extends EventDispatcher {
    object: Object3D;
    domElement: HTMLElement;
    enabled: boolean;
    movementSpeed: number;
    quickenSpeed: number;
    space: string;
    forwradVector: Vector3;
    private moveForward;
    private moveBackward;
    private moveLeft;
    private moveRight;
    private quicken;
    private worldVector;
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
