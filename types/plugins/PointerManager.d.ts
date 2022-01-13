import { BaseEvent, Vector2 } from "three";
import { EventDispatcher } from "../middleware/EventDispatcher";
export interface VisPointerEvent extends Omit<PointerEvent, 'type'>, BaseEvent {
    mouse: Vector2;
}
export declare class PointerManager extends EventDispatcher {
    private dom;
    private mouse;
    private canMouseMove;
    private mouseEventTimer;
    private throttleTime;
    constructor(dom: HTMLCanvasElement, throttleTime?: number);
    getMousePoint(): Vector2;
    pointerDown(event: PointerEvent): void;
    pointerMove(event: PointerEvent): void;
    pointerUp(event: PointerEvent): void;
}
