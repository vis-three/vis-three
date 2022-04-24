import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
export interface RendererConfig extends SymbolConfig {
    size: Vector2Config | null;
}
export interface ShadowMapConfig {
    enabled: boolean;
    autoUpdate: boolean;
    type: number;
}
export interface WebGLRendererViewPort {
    x: number;
    y: number;
    width: number;
    height: number;
}
export declare type WebGLRendererScissor = WebGLRendererViewPort;
export interface WebGLRendererConfig extends RendererConfig {
    vid: string;
    clearColor: string;
    pixelRatio: number;
    outputEncoding: number;
    physicallyCorrectLights: boolean;
    shadowMap: ShadowMapConfig;
    toneMapping: number;
    toneMappingExposure: number;
    adaptiveCamera: boolean;
    viewport: WebGLRendererViewPort | null;
    scissor: WebGLRendererScissor | null;
}
export interface CSS3DRendererConfig extends RendererConfig {
}
export declare type RendererAllType = WebGLRendererConfig | CSS3DRendererConfig;
export declare const getRendererConfig: () => RendererConfig;
export declare const getWebGLRendererConfig: () => WebGLRendererConfig;
export declare const getCSS3DRenderereConfig: () => CSS3DRendererConfig;
