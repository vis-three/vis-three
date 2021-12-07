import { WebGLRenderer } from "three";
import { Compiler, CompilerTarget } from "../../middleware/Compiler";
import { WebGLRendererConfig } from "./RendererConfig";
export interface RendererCompilerTarget extends CompilerTarget {
    WebGLRenderer: WebGLRendererConfig;
}
export interface RendererCompilerParameters {
    target?: RendererCompilerTarget;
    glRenderer?: WebGLRenderer;
}
export declare class RendererCompiler extends Compiler {
    private target;
    private glRenderer;
    constructor(parameters?: RendererCompilerParameters);
    set(path: string[], key: string, value: any): this;
    private setClearColor;
    private setPixelRatio;
    private setSize;
    private setViewpoint;
    private setScissor;
    setTarget(target: RendererCompilerTarget): this;
    compileAll(): this;
    dispose(): this;
}
