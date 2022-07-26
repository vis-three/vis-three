import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
/**
 * @todo width height 支持不同pass渲染不同区域
 */
export interface PassConfig extends SymbolConfig {
}
export interface SMAAPassConfig extends PassConfig {
}
export interface UnrealBloomPassConfig extends PassConfig {
    resolution: Vector2Config;
    strength: number;
    threshold: number;
    radius: number;
}
export interface SelectiveBloomPassConfig extends PassConfig {
    resolution: Vector2Config;
    strength: number;
    threshold: number;
    radius: number;
    renderScene: string;
    renderCamera: string;
    selectedObjects: string[];
}
export declare type PassConfigAllType = SMAAPassConfig | UnrealBloomPassConfig | SelectiveBloomPassConfig;
export declare const getPassConfig: () => PassConfig;
export declare const getSMAAPassConfig: () => SMAAPassConfig;
export declare const getUnrealBloomPassConfig: () => UnrealBloomPassConfig;
export declare const getSelectiveBloomPassConfig: () => SelectiveBloomPassConfig;
