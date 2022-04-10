import { WebGLRenderer } from "three";
import { Process, Processor } from "../../core/Processor";
import { Engine } from "../../engine/Engine";
import { RenderEvent } from "../../manager/RenderManager";
import { WebGLRendererConfig } from "./RendererConfig";
export interface WebGLRendererProcessAssemble {
    renderer: WebGLRenderer;
    config: WebGLRendererConfig;
    engine: Engine;
}
export interface GLRendererCacheData {
    adaptiveCameraFun?: (event: RenderEvent) => void;
}
export declare class WebGLRendererProcessor extends Processor {
    target?: WebGLRenderer;
    config?: WebGLRendererConfig;
    private engine?;
    private rendererCacheData;
    constructor();
    assemble(params: WebGLRendererProcessAssemble): this;
    process(params: Process): this;
    dispose(): this;
    private clearColor;
    private pixelRatio;
    private size;
    private viewport;
    private scissor;
    private adaptiveCamera;
}
