import { BasicConfig, Vector2Config } from "@vis-three/tdcm";
export interface TextureConfig extends BasicConfig {
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
    needsUpdate: boolean;
    flipY: boolean;
}
export interface ImageTextureConfig extends TextureConfig {
    /**通过resourceManager 解析的图片资源地址 */
    url: string;
}
export interface VideoTextureConfig extends TextureConfig {
    /**通过resourceManager 解析的视频资源地址 */
    url: string;
}
export interface CubeTextureConfig extends TextureConfig {
    cube: {
        /**通过resourceManager 解析的图片资源地址 */
        nx: string;
        /**通过resourceManager 解析的图片资源地址 */
        ny: string;
        /**通过resourceManager 解析的图片资源地址 */
        nz: string;
        /**通过resourceManager 解析的图片资源地址 */
        px: string;
        /**通过resourceManager 解析的图片资源地址 */
        py: string;
        /**通过resourceManager 解析的图片资源地址 */
        pz: string;
    };
}
export interface CanvasTextureConfig extends TextureConfig {
    /**通过resourceManager 解析的canvas资源地址 */
    url: string;
    /**如果canvas资源更新，你可以通过此属性为true更新 */
    needsUpdate: boolean;
}
export interface LoadTextureConfig extends TextureConfig {
    /**通过resourceManager 解析的纹理资源地址 */
    url: string;
}
export type TextureAllType = ImageTextureConfig | CubeTextureConfig | CanvasTextureConfig | VideoTextureConfig | LoadTextureConfig;
export declare const getTextureConfig: () => TextureConfig;
export declare const getImageTextureConfig: () => ImageTextureConfig;
export declare const getVideoTextureConfig: () => ImageTextureConfig;
export declare const getCubeTextureConfig: () => CubeTextureConfig;
export declare const getCanvasTextureConfig: () => CanvasTextureConfig;
export declare const getLoadTextureConfig: () => LoadTextureConfig;
