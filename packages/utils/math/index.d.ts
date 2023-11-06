import { Vector2, Vector3 } from "three";
/**
 * 根据精度判断数值是否相等
 * @param number1
 * @param number2
 * @param accuracy
 * @returns
 */
export declare function checkEqualNumber(number1: number, number2: number, accuracy?: number): boolean;
/**
 * 根据精度判断vector2是否相等
 * @param v1
 * @param v2
 * @param accuracy
 * @returns
 */
export declare function checkEqualVector2(v1: Vector2, v2: Vector2, accuracy?: number): boolean;
/**
 * 根据精度判断vector3是否相等
 * @param v1
 * @param v2
 * @param accuracy
 * @returns
 */
export declare function checkEqualVector3(v1: Vector3, v2: Vector3, accuracy?: number): boolean;
/**
 * 测试一个点是否在线的右侧
 * @param line1
 * @param line2
 * @param point
 * @returns
 */
export declare const checkPointLeftSideLine: (line1: Vector2, line2: Vector2, point: Vector2) => boolean;
/**
 * 测试两个vector2是否是同方向向量，夹角小于90度
 * @param vect1
 * @param vect2
 * @returns
 */
export declare const checkSameDirecton: (vect1: Vector2, vect2: Vector2) => boolean;
export declare const calcOperator: {
    "+": (a: number, b: number) => number;
    "-": (a: number, b: number) => number;
    "*": (a: number, b: number) => number;
    "/": (a: number, b: number) => number;
};
export declare const calc: (operate: keyof typeof calcOperator, v1: number, v2: number) => number;
