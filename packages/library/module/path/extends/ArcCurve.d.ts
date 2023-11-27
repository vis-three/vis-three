import { EllipseCurve, Vector2 } from "three";
export declare class ArcCurve extends EllipseCurve {
    static isLeft: (a: Vector2, b: Vector2, c: Vector2) => boolean;
    static isSameDirecton: (vect1: Vector2, vect2: Vector2) => boolean;
    static tempVector1: Vector2;
    static tempVector2: Vector2;
    static tempVector3: Vector2;
    start: Vector2;
    end: Vector2;
    vertical: number;
    center: Vector2;
    mid: Vector2;
    constructor(startX: number, startY: number, ctX: number, ctY: number, endX: number, endY: number);
}
