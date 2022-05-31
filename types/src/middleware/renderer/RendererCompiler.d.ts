import { WebGLRenderer } from "three";
import { Engine } from "../../engine/Engine";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { RendererAllType, WebGLRendererConfig } from "./RendererConfig";
import { Processor } from "../../core/Processor";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export interface RendererCompilerTarget extends CompilerTarget {
    [key: string]: WebGLRendererConfig;
}
export interface RendererCompilerParameters {
    target?: RendererCompilerTarget;
    engine: Engine;
}
export declare class RendererCompiler extends Compiler {
    MODULE: MODULETYPE;
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
    getObjectSymbol(renderer: WebGLRenderer | CSS3DRenderer): string | null;
    getObjectBySymbol(vid: string): any | null;
}
