import { SymbolConfig } from "@vis-three/middleware";
/**
 * @todo width height 支持不同pass渲染不同区域
 */
export interface PassConfig extends SymbolConfig {
    index: number;
}
export interface SMAAPassConfig extends PassConfig {
}
export interface UnrealBloomPassConfig extends PassConfig {
    strength: number;
    threshold: number;
    radius: number;
}
export interface SelectiveBloomPassConfig extends PassConfig {
    strength: number;
    threshold: number;
    radius: number;
    renderScene: string;
    renderCamera: string;
    selectedObjects: string[];
}
export interface SSAOPassConfig extends PassConfig {
    camera: string;
    scene: string;
    kernelRadius: number;
    kernelSize: number;
    noiseTexture: string;
    output: number;
    minDistance: number;
    maxDistance: number;
}
export type PassConfigAllType = SMAAPassConfig | UnrealBloomPassConfig | SelectiveBloomPassConfig | SSAOPassConfig;
export declare const getPassConfig: () => PassConfig;
export declare const getSMAAPassConfig: () => SMAAPassConfig;
export declare const getUnrealBloomPassConfig: () => UnrealBloomPassConfig;
export declare const getSelectiveBloomPassConfig: () => SelectiveBloomPassConfig;
export declare const getSSAOPassConfig: () => SSAOPassConfig;
