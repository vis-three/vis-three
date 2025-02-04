import { Vector2 } from "three";
const tempVector1 = new Vector2();
const tempVector2 = new Vector2();
const tempVector3 = new Vector2();
const tempVector4 = new Vector2();
const tempVector5 = new Vector2();
const tempVector6 = new Vector2();
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
export const getArcDetail = function (startX, startY, vertical, clockwise, endX, endY) {
    const start = tempVector1.set(startX, startY);
    const end = tempVector2.set(endX, endY);
    const mid = tempVector3.copy(end).sub(start).multiplyScalar(0.5).add(start);
    const center = tempVector4.copy(end).sub(start);
    center.set(-center.y, center.x).negate().normalize();
    const verticalDirection = tempVector5.copy(center);
    center.multiplyScalar(vertical).add(mid);
    const r = tempVector6.copy(end).sub(center).length();
    return {
        start,
        end,
        mid,
        center,
        r,
        verticalDirection,
    };
};
