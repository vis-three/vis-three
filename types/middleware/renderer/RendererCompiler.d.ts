import { Engine } from "../../engine/Engine";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { RendererAllType, WebGLRendererConfig } from "./RendererConfig";
import { Processor } from "../../core/Processor";
import { EngineSupport } from "../../main";
export interface RendererCompilerTarget extends CompilerTarget {
    [key: string]: WebGLRendererConfig;
}
export interface RendererCompilerParameters {
    target?: RendererCompilerTarget;
    engine: Engine;
}
export declare class RendererCompiler extends Compiler {
    private target;
    private engine;
    private processorMap;
    private map;
    constructor(parameters?: RendererCompilerParameters);
    assembly(vid: string, callback: (params: Processor) => void): void;
    add(config: RendererAllType): void;
    setTarget(target: RendererCompilerTarget): this;
    useEngine(engine: EngineSupport): this;
    compileAll(): this;
    dispose(): this;
}
