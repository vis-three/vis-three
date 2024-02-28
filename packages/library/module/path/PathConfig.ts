import { SymbolConfig, getSymbolConfig } from "@vis-three/middleware";

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

export const getPathConfig = function (): PathConfig {
  return Object.assign(getSymbolConfig(), {
    curves: [],
    autoClose: false,
  });
};

export const getPath3Config = function (): Path3Config {
  return Object.assign(getSymbolConfig(), { curves: [], autoClose: false });
};
