import { SymbolConfig, Vector2Config } from "@vis-three/middleware";
export interface CurveConfig extends SymbolConfig {
    arcLengthDivisions: number;
}
export interface ArcCurveConfig extends CurveConfig {
    start: Vector2Config;
    end: Vector2Config;
    vertical: number;
    clockwise: boolean;
}
export declare const getCurveConfig: () => CurveConfig;
export declare const getArcCurveConfig: () => ArcCurveConfig;
