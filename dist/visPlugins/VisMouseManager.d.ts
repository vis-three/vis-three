import { Vector2 } from "three";
import { VisEventDispatcher } from "../visFix/VisEventDispatcher";
export interface VisPointerEvent extends PointerEvent {
    mouse: Vector2;
}
export declare class VisPointerManager extends VisEventDispatcher<VisPointerEvent> {
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
//# sourceMappingURL=VisMouseManager.d.ts.map