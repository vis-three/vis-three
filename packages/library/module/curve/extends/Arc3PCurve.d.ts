import { EllipseCurve, Vector2 } from "three";
export declare class Arc3PCurve extends EllipseCurve {
    start: Vector2;
    end: Vector2;
    ctrl: Vector2;
    private tempVector;
    constructor(startX: number, startY: number, ctX: number, ctY: number, endX: number, endY: number);
}
