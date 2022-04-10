import { Engine } from "../../engine/Engine";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { RendererAllType, WebGLRendererConfig } from "./RendererConfig";
import { WebGLRendererCompiler } from "./WebGLRendererCompiler";
import { Processor } from "../../core/Processor";
export interface RendererCompilerTarget extends CompilerTarget {
    [key: string]: WebGLRendererConfig;
}
export interface RendererComilerMap {
    WebGLRenderer?: WebGLRendererCompiler;
}
export interface RendererCompilerParameters {
    target?: RendererCompilerTarget;
    engine: Engine;
}
export declare class RendererCompiler extends Compiler {
    private target;
    private engine;
    private map;
    private processorMap;
    private rendererMap;
    constructor(parameters?: RendererCompilerParameters);
    assembly(vid: string, callback: (params: Processor) => void): void;
    add(config: RendererAllType): void;
    setTarget(target: RendererCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
