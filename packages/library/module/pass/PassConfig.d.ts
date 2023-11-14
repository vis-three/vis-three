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
    /**渲染场景 vid */
    renderScene: string;
    /**渲染相机 vid */
    renderCamera: string;
    /**发光物体 vid list */
    selectedObjects: string[];
}
export interface SSAOPassConfig extends PassConfig {
    /**目标相机 vid */
    camera: string;
    /**目标场景 vid */
    scene: string;
    kernelRadius: number;
    kernelSize: number;
    noiseTexture: string;
    output: number;
    minDistance: number;
    maxDistance: number;
}
export interface SSRPassConfig extends PassConfig {
    renderer: string;
    scene: string;
    camera: string;
    width: number;
    height: number;
    ground: boolean;
    groudOption: {
        geometry: string;
        color: string;
        textureWidth: number;
        textureHeight: number;
        clipBias: number;
        multisample: number;
    };
    selects: string[];
    opacity: number;
    output: number;
    maxDistance: number;
    thickness: number;
    bouncing: boolean;
    distanceAttenuation: boolean;
    fresnel: boolean;
    infiniteThick: boolean;
}
export interface FilmPassConfig extends PassConfig {
    grayscale: boolean;
    noiseIntensity: number;
    scanlinesIntensity: number;
    scanlinesCount: number;
}
export interface LUTPassConfig extends PassConfig {
    lut: string;
    intensity: number;
    use2D: boolean;
}
export type PassConfigAllType = SMAAPassConfig | UnrealBloomPassConfig | SelectiveBloomPassConfig | SSAOPassConfig | SSRPassConfig | FilmPassConfig;
export declare const getPassConfig: () => PassConfig;
export declare const getSMAAPassConfig: () => SMAAPassConfig;
export declare const getUnrealBloomPassConfig: () => UnrealBloomPassConfig;
export declare const getSelectiveBloomPassConfig: () => SelectiveBloomPassConfig;
export declare const getSSAOPassConfig: () => SSAOPassConfig;
export declare const getSSRPassConfig: () => SSRPassConfig;
export declare const getFilmPassConfig: () => FilmPassConfig;
export declare const getLUTPassConfig: () => LUTPassConfig;
