import { Engine } from "../../engine/Engine";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { RendererAllType, WebGLRendererConfig } from "./RendererConfig";
import { WebGLRendererCompiler } from "./WebGLRendererCompiler";
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
    constructor(parameters?: RendererCompilerParameters);
    add(type: string, config: RendererAllType): void;
    set(path: string[], key: string, value: any): this;
    setTarget(target: RendererCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
