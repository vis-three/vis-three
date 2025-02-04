/**
 * 解析颜色
 * @param str 颜色rgb或rgba
 * @param percent 是否已百分比解析
 * @returns {r, g, b, a?}
 */
export declare const parseColor: (str: string, percent?: boolean) => {
    r: number;
    g: number;
    b: number;
    a: number;
} | {
    r: number;
    g: number;
    b: number;
    a: null;
};
