import { EllipseCurve, Vector2 } from "three";
export declare class ArcCurve extends EllipseCurve {
    start: Vector2;
    end: Vector2;
    vertical: number;
    center: Vector2;
    private tempVector;
    constructor(startX: number, startY: number, vertical: number, clockwise: boolean, endX: number, endY: number);
}
