import { SymbolConfig } from "@vis-three/middleware";
export interface SegmentConfig {
    curve: string;
    params: number[];
}
export interface PathConfig extends SymbolConfig {
    curves: SegmentConfig[];
    autoClose: boolean;
}
export interface Path3Config extends SymbolConfig {
}
export declare const getPathConfig: () => PathConfig;
export declare const getPath3Config: () => Path3Config;
