import { EllipseCurve } from "three";
export declare class ArcCurve extends EllipseCurve {
    private start;
    private end;
    private vertical;
    private center;
    private tempVector;
    constructor(startX: number, startY: number, vertical: number, clockwise: boolean, endX: number, endY: number);
}
