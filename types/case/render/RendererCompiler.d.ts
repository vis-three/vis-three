import { BaseEvent, WebGLRenderer } from "three";
import { ModelingEngine } from "../../main";
import { RenderEvent, RenderManager } from "../../manager/RenderManager";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { RENDERERMANAGER } from "../constants/EVENTTYPE";
import { WebGLRendererConfig } from "./RendererConfig";
export interface RendererCompilerTarget extends CompilerTarget {
    WebGLRenderer: WebGLRendererConfig;
}
export interface RendererCompilerParameters {
    target?: RendererCompilerTarget;
    glRenderer?: WebGLRenderer;
    engine?: ModelingEngine;
}
export interface GLRendererCacheData {
    adaptiveCameraFun?: (event: (BaseEvent | RenderEvent) & {
        type: RENDERERMANAGER.RENDER;
    } & {
        target: RenderManager;
    }) => void;
}
export declare class RendererCompiler extends Compiler {
    private target;
    private glRenderer;
    private engine?;
    private glRendererCacheData;
    constructor(parameters?: RendererCompilerParameters);
    private setClearColor;
    private setPixelRatio;
    private setSize;
    private setViewpoint;
    private setScissor;
    private setAdaptiveCamera;
    set(path: string[], key: string, value: any): this;
    setTarget(target: RendererCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
