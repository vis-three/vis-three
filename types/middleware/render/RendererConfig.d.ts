import { SymbolConfig, Vector2Config } from "../common/CommonConfig";
export interface RenderConfig extends SymbolConfig {
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
export interface WebGLRendererScissor extends WebGLRendererViewPort {
}
export interface WebGLRendererConfig extends RenderConfig {
    readonly vid: string;
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
    size: Vector2Config | null;
}
export declare type RendererAllType = WebGLRendererConfig | CSS3DRendererConfig;
export interface CSS3DRendererConfig extends RenderConfig {
    vid: 'CSS3DRenderer';
    type: 'CSS3DRenderer';
    size: null;
}
export declare const getWebGLRendererConfig: () => WebGLRendererConfig;
