import { SymbolConfig } from "@vis-three/middleware";
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
    params: LineSegmentConfig | ArcSegmentConfig | bezierSegmentConfig | quadraticSegmentConfig;
}
export interface PathConfig extends SymbolConfig {
    curves: SegmentConfig[];
    /**自动闭合路径，会在头尾之间添加一条直线line */
    autoClose: boolean;
}
export interface Path3Config extends SymbolConfig {
    curves: SegmentConfig[];
    /**自动闭合路径，会在头尾之间添加一条直线line */
    autoClose: boolean;
}
export declare const getPathConfig: () => PathConfig;
export declare const getPath3Config: () => Path3Config;
