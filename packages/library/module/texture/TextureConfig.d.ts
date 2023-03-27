import { SymbolConfig, Vector2Config } from "@vis-three/middleware";
export interface TextureConfig extends SymbolConfig {
    name: string;
    mapping: number;
    wrapS: number;
    wrapT: number;
    magFilter: number;
    minFilter: number;
    anisotropy: number;
    format: number;
    offset: Vector2Config;
    repeat: Vector2Config;
    rotation: number;
    center: Vector2Config;
    matrixAutoUpdate: boolean;
    encoding: number;
    needsUpdate: boolean;
    flipY: boolean;
}
export interface ImageTextureConfig extends TextureConfig {
    url: string;
}
export interface VideoTextureConfig extends TextureConfig {
    url: string;
}
export interface CubeTextureConfig extends TextureConfig {
    cube: {
        nx: string;
        ny: string;
        nz: string;
        px: string;
        py: string;
        pz: string;
    };
}
export interface CanvasTextureConfig extends TextureConfig {
    url: string;
    needsUpdate: boolean;
}
export interface LoadTextureConfig extends TextureConfig {
    url: string;
}
export type TextureAllType = ImageTextureConfig | CubeTextureConfig | CanvasTextureConfig | VideoTextureConfig | LoadTextureConfig;
export declare const getTextureConfig: () => TextureConfig;
export declare const getImageTextureConfig: () => ImageTextureConfig;
export declare const getVideoTextureConfig: () => ImageTextureConfig;
export declare const getCubeTextureConfig: () => CubeTextureConfig;
export declare const getCanvasTextureConfig: () => CanvasTextureConfig;
export declare const getLoadTextureConfig: () => LoadTextureConfig;
