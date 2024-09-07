import { Vector2 } from "three";
export declare const getArcDetail: (startX: number, startY: number, vertical: number, clockwise: boolean, endX: number, endY: number) => {
    start: Vector2;
    end: Vector2;
    mid: Vector2;
    center: Vector2;
    r: number;
    verticalDirection: Vector2;
};
