import { DataSupport } from "../../core/DataSupport";
import { MODULETYPE } from "../constants/MODULETYPE";
import { RendererCompiler, RendererCompilerTarget } from "./RendererCompiler";
export declare class RendererDataSupport extends DataSupport<RendererCompilerTarget, RendererCompiler> {
    MODULE: MODULETYPE;
    constructor(data?: RendererCompilerTarget);
}
