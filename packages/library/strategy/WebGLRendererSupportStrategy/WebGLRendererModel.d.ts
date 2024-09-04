import { EngineSupport } from "@vis-three/tdcm";
import { RendererConfig, RendererCompiler } from "@vis-three/module-renderer";
import { WebGLRendererEngine } from "@vis-three/plugin-webgl-renderer";
import { WebGLRenderer } from "three";
export interface ShadowMapConfig {
    enabled: boolean;
    autoUpdate: boolean;
    needsUpdate: boolean;
    type: number;
}
export interface WebGLRendererViewPort {
    x: number;
    y: number;
    width: number;
    height: number;
}
export type WebGLRendererScissor = WebGLRendererViewPort;
export interface WebGLRendererConfig extends RendererConfig {
    clearColor: string;
    pixelRatio: number;
    /**@deprecated use outputColorSpace */
    outputEncoding: number;
    outputColorSpace: string;
    physicallyCorrectLights: boolean;
    shadowMap: ShadowMapConfig;
    toneMapping: number;
    toneMappingExposure: number;
    adaptiveCamera: boolean;
    viewport: WebGLRendererViewPort | null;
    scissor: WebGLRendererScissor | null;
}
export declare const getWebGLRendererConfig: () => WebGLRendererConfig;
export interface WebGLRendererSupportEngine extends EngineSupport, WebGLRendererEngine {
}
declare const _default: import("@vis-three/tdcm").ModelOption<WebGLRendererConfig, WebGLRenderer, {}, {}, WebGLRendererSupportEngine, RendererCompiler>;
export default _default;
