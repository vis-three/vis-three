import { WebGLRenderer } from "three";
import { Compiler } from "../../core/Compiler";
import { EngineSupport } from "../../main";
import { MODULETYPE } from "../constants/MODULETYPE";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer";
import { RendererConfigAllType } from "./RendererConfig";
export type RendererAllType = WebGLRenderer | CSS3DRenderer;
export declare class RendererCompiler extends Compiler<RendererConfigAllType, RendererAllType> {
    MODULE: MODULETYPE;
    constructor();
    useEngine(engine: EngineSupport): this;
}
