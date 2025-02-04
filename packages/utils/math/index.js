import { MathUtils } from "three";
/**
 * 根据精度判断数值是否相等
 * @param number1
 * @param number2
 * @param accuracy
 * @returns boolean
 */
export function checkEqualNumber(number1, number2, accuracy = 3) {
    return (Math.floor(number1 * 10 ** accuracy) ===
        Math.floor(number2 * 10 ** accuracy));
}
/**
 * 根据精度判断vector2是否相等
 * @param v1
 * @param v2
 * @param accuracy
 * @returns boolean
 */
export function checkEqualVector2(v1, v2, accuracy = 3) {
    return (checkEqualNumber(v1.x, v2.x, accuracy) &&
        checkEqualNumber(v1.y, v2.y, accuracy));
}
/**
 * 根据精度判断vector3是否相等
 * @param v1
 * @param v2
 * @param accuracy
 * @returns boolean
 */
export function checkEqualVector3(v1, v2, accuracy = 3) {
    return (checkEqualNumber(v1.x, v2.x, accuracy) &&
        checkEqualNumber(v1.y, v2.y, accuracy) &&
        checkEqualNumber(v1.z, v2.z, accuracy));
}
/**
 * 测试一个点是否在线的右侧
 * @param line1 线上一点
 * @param line2 线上另外一点
 * @param point v2点
 * @returns boolean
 */
export const checkPointLeftSideLine = function (line1, line2, point) {
    return ((line2.x - line1.x) * (point.y - line1.y) -
        (line2.y - line1.y) * (point.x - line1.x) >
        0);
};
/**
 * 测试两个vector2是否是同方向向量，夹角小于90度
 * @param vect1
 * @param vect2
 * @returns boolean
 */
export const checkSameDirecton = function (vect1, vect2) {
    const denominator = Math.sqrt(vect1.lengthSq() * vect2.lengthSq());
    if (denominator === 0) {
        return false;
    }
    const theta = vect1.dot(vect2) / denominator;
    return Math.acos(MathUtils.clamp(theta, -1, 1)) < Math.PI / 2;
};
export const calcOperator = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => a / b,
};
/**
 *
 * @param operate
 * @param v1
 * @param v2
 * @returns
 */
export const calc = function (operate, v1, v2) {
    return calcOperator[operate](v1, v2);
};
