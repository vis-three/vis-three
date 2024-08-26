import { BasicConfig } from "@vis-three/tdcm";
export type LineSegmentConfig = [number, number, number, number];
export type ArcSegmentConfig = [number, number, number, number, number, number];
export type bezierSegmentConfig = [
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
export type quadraticSegmentConfig = [
    number,
    number,
    number,
    number,
    number,
    number
];
export interface SegmentConfig {
    /**路径名称：line, arc,  bezier, quadratic*/
    curve: string;
    params: number[];
}
export interface PathConfig extends BasicConfig {
    curves: SegmentConfig[];
    /**自动闭合路径，会在头尾之间添加一条直线line */
    autoClose: boolean;
}
export interface Path3Config extends BasicConfig {
    curves: SegmentConfig[];
    /**自动闭合路径，会在头尾之间添加一条直线line */
    autoClose: boolean;
}
export declare const getPathConfig: () => PathConfig;
export declare const getPath3Config: () => Path3Config;
