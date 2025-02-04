import { Vector2 } from "three";
/**
 * 获取一个圆的详情
 * @param startX 起始点X
 * @param startY 起始点y
 * @param vertical 垂线距离
 * @param clockwise 是否逆时针
 * @param endX 结束点x
 * @param endY 结束点y
 * @returns
 */
export declare const getArcDetail: (startX: number, startY: number, vertical: number, clockwise: boolean, endX: number, endY: number) => {
    start: Vector2;
    end: Vector2;
    mid: Vector2;
    center: Vector2;
    r: number;
    verticalDirection: Vector2;
};
