import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
export interface TextureConfig extends SymbolConfig {
    name: string;
    image: string;
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
}
export interface ImageTextureConfig extends TextureConfig {
}
export declare type TextureAllType = ImageTextureConfig;
export declare const getTextureConfig: () => TextureConfig;
export declare const getImageTextureConfig: () => ImageTextureConfig;
