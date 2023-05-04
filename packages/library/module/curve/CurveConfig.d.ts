import { SymbolConfig } from "@vis-three/middleware";
export interface CurveConfig extends SymbolConfig {
    arcLengthDivisions: number;
}
export interface ArcCurveConfig extends CurveConfig {
    startX: number;
    startY: number;
    vertical: number;
    clockwise: boolean;
    endX: number;
    endY: number;
}
export interface LineCurveConfig extends CurveConfig {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
}
export type CurveAllType = LineCurveConfig | ArcCurveConfig;
export declare const getCurveConfig: () => CurveConfig;
export declare const getArcCurveConfig: () => ArcCurveConfig;
export declare const getLineCurveConfig: () => LineCurveConfig;
