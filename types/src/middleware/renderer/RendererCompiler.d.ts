import { WebGLRenderer } from "three";
import { Compiler, CompilerTarget } from "../../core/Compiler";
import { RendererAllType } from "./RendererConfig";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
export interface RendererCompilerTarget extends CompilerTarget<RendererAllType> {
}
export declare class RendererCompiler extends Compiler<RendererAllType, RendererCompilerTarget, WebGLRenderer | CSS3DRenderer> {
    MODULE: MODULETYPE;
    constructor();
    useEngine(engine: EngineSupport): this;
}
