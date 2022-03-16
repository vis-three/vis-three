import { WebGLRenderer } from "three";
import { Compiler } from "../../core/Compiler";
import { Engine } from "../../engine/Engine";
import { RenderEvent } from "../../manager/RenderManager";
import { WebGLRendererConfig } from "./RendererConfig";
export interface WebGLRendererCompilerParameters {
    engine: Engine;
    target: WebGLRendererConfig;
}
export interface GLRendererCacheData {
    adaptiveCameraFun?: (event: RenderEvent) => void;
}
export declare class WebGLRendererCompiler extends Compiler {
    renderer: WebGLRenderer;
    engine: Engine;
    target: WebGLRendererConfig;
    private rendererCacheData;
    constructor(parameters: WebGLRendererCompilerParameters);
    private setClearColor;
    private setPixelRatio;
    private setSize;
    private setViewpoint;
    private setScissor;
    private setAdaptiveCamera;
    set(path: string[], key: string, value: any): this;
    setTarget(target: WebGLRendererConfig): this;
    compileAll(): this;
    dispose(): this;
}
