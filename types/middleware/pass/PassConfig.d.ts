import { SymbolConfig } from "../common/CommonConfig";
/**
 * @todo width height 支持不同pass渲染不同区域
 */
export interface PassConfig extends SymbolConfig {
}
export interface SMAAPassConfig extends PassConfig {
}
export interface UnrealBloomPassConfig extends PassConfig {
    strength: number;
    threshold: number;
    radius: number;
}
export declare type PassConfigAllType = SMAAPassConfig | UnrealBloomPassConfig;
export declare const getPassConfig: () => PassConfig;
export declare const getSMAAPassConfig: () => SMAAPassConfig;
export declare const getUnrealBloomPassConfig: () => UnrealBloomPassConfig;
